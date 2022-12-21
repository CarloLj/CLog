const { createRelevantPoint, updateRelevantPoint, getRelevantPointsByProjectUpdateId, deleteRelevantPoint } = require("./relevantpoint.controller");
const router = require("express").Router();

//middleware
const { checkToken } = require('../../auth/token_validation');

router.post("/", checkToken, createRelevantPoint);
router.patch("/", checkToken, updateRelevantPoint);
router.get("/:id", checkToken, getRelevantPointsByProjectUpdateId);
router.delete("/", checkToken, deleteRelevantPoint);

module.exports = router;