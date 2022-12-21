const { createProjectUpdate, getProjectUpdateByProjectId, updateProjectUpdate, deleteProjectUpdate } = require('./projectupdate.service');

module.exports = {
    createProjectUpdate: (req, res) => {
        const body = req.body;
        createProjectUpdate(body, (err, results) => {
            // if callback returns error
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: "Database connection error"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    getProjectUpdates: (req, res) => {
        const body = req.body;
        getProjectUpdates(body, (err, results) => {
            // if callback returns error
            if(err) {
                console.log(err)
                return;
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    getProjectUpdateByProjectId: (req, res) => {
        const id = req.params.id;
        getProjectUpdateByProjectId(id, (err, results) => {
            // if callback returns error
            if(err) {
                console.log(err)
                return;
            }
            if(!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Not found"
                });
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    updateProjectUpdate: (req, res) => {
        const body = req.body;
        updateProjectUpdate(body, (err, results) => {
            // if callback returns error
            if(err) {
                console.log(err)
                return res.json({
                    success: 0,
                    message: err.message
                });
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed to update project update"
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Project update udpated successfully'
            })
        })
    },
    deleteProjectUpdate: (req, res) => {
        const data = req.body;
        deleteProjectUpdate(data, (err, results) => {
            if(err) {
                console.log(err)
                return;
            }
            if(results){
                if(results.affectedRows == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Project update not found"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: 'Project update deleted successfully'
                })
            } else {
                return res.json({
                    success: 0,
                    message: "Unknown error"
                });
            }
        })
    }
}