const express = require("express");
const jobRouter = express.Router();

// IMPORT CONTROLLER(S)
const { searchJobs } = require("../controllers/jobController");

jobRouter.route("/getpostings").get(searchJobs);

module.exports = jobRouter;
