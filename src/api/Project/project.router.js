const { createProject, getProjects, getProjectById, deleteProject, updateProject } = require("./project.controller");
const router = require("express").Router();

//middleware
const { checkToken } = require('../../auth/token_validation');

router.post("/", checkToken, createProject);
router.patch("/", checkToken, updateProject);
router.get("/", checkToken, getProjects);
router.get("/:id", checkToken, getProjectById);
router.delete("/", checkToken, deleteProject);

module.exports = router;