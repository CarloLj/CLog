const pool = require("../../config/database");

module.exports = {
    // Data from the controller
    // Callback inside the method
    createRelevantPoint: (data, callBack) => {
        const query = `INSERT INTO relevantpoint(relevant_point_id, update_id, description) 
            VALUES (?,?,?)`
        pool.query(
            query,
            [
                null,
                data.update_id,
                data.description,
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    getRelevantPointsByProjectUpdateId: (id, callBack) => {
        const query = `SELECT * FROM relevantpoint WHERE update_id = ?`
        pool.query(
            query,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        )
    },
    updateRelevantPoint: (data, callBack) => {
        const query = `UPDATE relevantpoint SET description=?
            WHERE relevant_point_id=?`
        pool.query(
            query,
            [
                data.description,
                data.id
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    deleteRelevantPoint: (data, callBack) => {
        const query = `DELETE FROM relevantpoint WHERE relevant_point_id = ?`
        pool.query(
            query,
            [data.id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        )
    },
}