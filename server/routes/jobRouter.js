const express = require("express");
const jobRouter = express.Router();

// IMPORT CONTROLLER(S)
const { searchJobs } = require("../controllers/jobController");

// define routes
jobRouter.route("/getpostings").get(searchJobs);

module.exports = jobRouter;
