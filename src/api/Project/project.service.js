const pool = require("../../config/database");

const ValidStatuses = {
	Active: "active",
	Completed: "completed",
	Cancelled: "cancelled",
	OnHold: "on_hold",
    Planned: "planned"
}

module.exports = {
    // Data from the controller
    // Callback inside the method
    create: (data, callBack) => {
        const query = `INSERT INTO project(project_id, creator_id, status, created_at, name, description) 
            VALUES (?,?,?,?,?,?)`
        if (!Object.values(ValidStatuses).includes(data.status)){
            return callBack({message: 'Not a valid status'})
        }
        pool.query(
            query,
            [
                null,
                data.creator_id,
                data.status,
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
    getProjects: (data, callBack) => {
        const query = "SELECT * FROM project"
        pool.query(
            query,
            (error, results, fields) => {
                if(error) {
                    console.log(error)
                    return callBack(error)
                } 
                return callBack(null, results)
            }
        );
    },
    getProjectById: (id, callBack) => {
        const query = `SELECT * FROM project WHERE project_id = ?`
        pool.query(
            query,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callBack(error)
                } 
                return callBack(null, results[0])
            }
        )
    },
    updateProject: (data, callBack) => {
        const query = `UPDATE project SET project_id=?, creator_id=?, status=?, created_at=?, name=?, description=? 
            WHERE project_id=?`
        if (!Object.values(ValidStatuses).includes(data.status)){
            return callBack({message: 'Could not update, invalid status'})
        }
        pool.query(
            query,
            [
                data.project_id,
                data.creator_id,
                data.status,
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
    deleteProject: (data, callBack) => {
        const query = `DELETE FROM project WHERE project_id = ?`
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