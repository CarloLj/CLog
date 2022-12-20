const { create, getProjects, getProjectById, updateProject, deleteProject } = require('./project.service');

module.exports = {
    createProject: (req, res) => {
        const body = req.body;
        create(body, (err, results) => {
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
    getProjects: (req, res) => {
        const body = req.body;
        getProjects(body, (err, results) => {
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
    getProjectById: (req, res) => {
        const id = req.params.id;
        getProjectById(id, (err, results) => {
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
    updateProject: (req, res) => {
        const body = req.body;
        updateProject(body, (err, results) => {
            // if callback returns error
            if(err) {
                console.log(err)
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Failed to update user"
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Project udpated successfully'
            })
        })
    },
    deleteProject: (req, res) => {
        const data = req.body;
        deleteProject(data, (err, results) => {
            if(err) {
                console.log(err)
                return;
            }
            if(results){
                if(results.affectedRows == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Project not found"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: 'Project deleted successfully'
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