const { createRelevantPoint, updateRelevantPoint, getRelevantPointsByProjectUpdateId, deleteRelevantPoint } = require('./relevantpoint.service');

module.exports = {
    createRelevantPoint: (req, res) => {
        const body = req.body;
        createRelevantPoint(body, (err, results) => {
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
    getRelevantPointsByProjectUpdateId: (req, res) => {
        const id = req.params.id;
        getRelevantPointsByProjectUpdateId(id, (err, results) => {
            // if callback returns error
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: err
                })
            }
            if(!results) {
                return res.status(404).json({
                    success: 0,
                    message: "Not found"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    },
    updateRelevantPoint: (req, res) => {
        const body = req.body;
        updateRelevantPoint(body, (err, results) => {
            // if callback returns error
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            if(!results){
                return res.status(400).json({
                    success: 0,
                    message: "Failed to update relevant point"
                })
            }
            return res.status(200).json({
                success: 1,
                message: 'Project Update relevant point udpated successfully'
            })
        })
    },
    deleteRelevantPoint: (req, res) => {
        const data = req.body;
        deleteRelevantPoint(data, (err, results) => {
            if(err) {
                console.log(err)
                return res.status(500).json({
                    success: 0,
                    message: err
                });
            }
            if(results){
                if(results.affectedRows == 0) {
                    return res.status(404).json({
                        success: 0,
                        message: "Relevant point not found"
                    });
                }
                return res.status(200).json({
                    success: 1,
                    message: 'Relevant point deleted successfully'
                })
            } else {
                return res.status(500).json({
                    success: 0,
                    message: "Unknown error"
                });
            }
        })
    }
}