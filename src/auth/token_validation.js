const { verify } = require('jsonwebtoken');

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");
        if (token) {
            // bearer *
            // 123456 7
            token = token.slice(7);
            verify(token, process.env.JWT_ENCRYPTION, (err, decoded) => {
                if(err){
                    res.json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.json({
                success: 0,
                message: "Acess denied! unauthorized user"
            });
        }
    }
}