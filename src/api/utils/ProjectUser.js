
const pool = require("../../config/database");

module.exports = {
    getProjectIdsByUsernameAlike: (creator_name) => {
        return new Promise((resolve, reject)=>{
            const query = `SELECT DISTINCT project_id FROM project INNER JOIN user ON user.username LIKE ? AND project.creator_id = user.user_id;` 
                pool.query(
                    query,
                    ['%'+creator_name+'%'],
                    (error, results, fields) => {
                    if(error) {
                        return reject(error)
                    } 
                    resolve(Object.values(JSON.parse(JSON.stringify(results))));
                }
            );
        });
    }
}