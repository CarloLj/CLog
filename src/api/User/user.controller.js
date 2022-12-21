const { createUser , getUserByUserEmail, checkEmail} = require('./user.service');

const bcrypt = require("bcryptjs");
const { sign } = require('jsonwebtoken')
const pool = require('../../config/database');

module.exports = {
    signUp: (req, res) => {
        const body = req.body;
        body.password = bcrypt.hashSync(body.password, parseInt(process.env.JWT_SALT))
        // Si ya existe el email del usuario
        checkEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
                return err
            }
            if (results) {
                return res.json({
                    success: 0,
                    message: "User already registered with that email"
                });
            }
            if (!body.username || body.username === "") {
                return res.json({
                    success: 0,
                    message: "Invalid Username"
                });
            }
            createUser(body, (err, results) => {
                // if callback returns error
                if (err) {
                    console.log(err)
                    return res.status(500).json({
                        success: 0,
                        message: "Database connection error"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            }) 
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
            const result = bcrypt.compareSync(body.password, results.password)
            if (result) {
                results.password = undefined
                //Sign takes three params (onbject we want to seign and create web token)
                const jsontoken = sign({ result: results }, process.env.JWT_ENCRYPTION, {
                    expiresIn: "8h"
                });
                return res.json({
                    success: 1,
                    message: "Login success",
                    user: results,
                    token: jsontoken
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                });
            }
        });
    }
}