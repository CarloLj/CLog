const pool = require("../../config/database");

const ValidTypes = {
	Update: "update",
	BugFix: "bugfix",
	Performance: "performance",
}

module.exports = {
    // Data from the controller
    // Callback inside the method
    createProjectUpdate: (data, callBack) => {
        const query = `INSERT INTO projectupdate(update_id, project_id, type, created_at, name, description) 
            VALUES (?,?,?,?,?,?)`
        if (!Object.values(ValidTypes).includes(data.type)){
            return callBack({message: 'Not a valid status'})
        }
        pool.query(
            query,
            [
                null,
                data.project_id,
                data.type,
                data.created_at,
                data.name,
                data.description
            ],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    getProjectUpdateByProjectId: (id, callBack) => {
        const query = `SELECT * FROM projectupdate WHERE project_id = ?`
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
    updateProjectUpdate: (data, callBack) => {
        const query = `UPDATE projectupdate SET update_id=?, project_id=?, type=?, created_at=?, name=?, description=? 
            WHERE update_id=?`
        if (!Object.values(ValidTypes).includes(data.type)){
            return callBack({message: 'Could not update, invalid type'})
        }
        pool.query(
            query,
            [
                data.update_id,
                data.project_id,
                data.type,
                data.created_at,
                data.name,
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
    deleteProjectUpdate: (data, callBack) => {
        const query = `DELETE FROM projectupdate WHERE update_id = ?`
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