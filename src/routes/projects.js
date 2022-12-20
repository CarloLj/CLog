const express = require('express');
const router = express.Router();
const verifyToken = require('../utils/verifyToken')

const mysqlConnection = require('../config/database');

router.post("/projects", verifyToken, (req , res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403);
        }else{
            res.json({
                    mensaje: "Mostrando posts",
                    authData
                });
        }
    });
});

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if(!err){
            res.json(rows);
        } else {
            console.log(err);
        }
    })
})

module.exports = router;