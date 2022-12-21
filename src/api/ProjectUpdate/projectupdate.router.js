const { createProjectUpdate, updateProjectUpdate, getProjectUpdateByProjectId, deleteProjectUpdate } = require("./projectupdate.controller");
const router = require("express").Router();

//middleware
const { checkToken } = require('../../auth/token_validation');

router.post("/", checkToken, createProjectUpdate);
router.patch("/", checkToken, updateProjectUpdate);
router.get("/:id", checkToken, getProjectUpdateByProjectId);
router.delete("/", checkToken, deleteProjectUpdate);

module.exports = router;