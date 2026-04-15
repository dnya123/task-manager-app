
const express = require("express");
const router = express.Router();

// import controller
const { getHome, getTasks } = require("../controllers/taskController");

// routes
router.get("/", getHome);
router.get("/tasks", getTasks);

module.exports = router;