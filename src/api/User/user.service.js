const pool = require("../../config/database");

module.exports = {
    // Data from the controller
    // Callback inside the method
    createUser: (data, callBack) => {
        const query = "INSERT INTO user(user_id, email, username, password) VALUES (?,?,?,?)"
        pool.query(
            query,
            [
                null, 
                data.email,
                data.username,
                data.password
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    getUserByUserEmail: (email, callBack) => {
        query = "SELECT * FROM user WHERE email = ?"
        pool.query(
            query,
            [email],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    },
    checkEmail: (email, callBack) => {
        query = "SELECT email FROM user WHERE email = ?"
        pool.query(
            query,
            [email],
            (error, results, fields) => {
                if(error){
                    callBack(error);
                }
                return callBack(null, results[0])
            }
        );
    }
}