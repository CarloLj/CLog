const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')

app.post("/getToken", (req , res) => {
    const {id, email, username} = req.body
    const user = {
        id,
        username,
        email,
    }
    jwt.sign({user}, 'secretkey', {expiresIn: '86400s'}, (err, token) => {
        res.json({
            token
        });
    });
});

module.exports = router;