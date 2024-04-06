const express = require("express");
const jobRouter = express.Router();

const { searchJobs } = require("../controllers/jobController");

jobRouter.route("/jobsearch").get(searchJobs);

module.exports = jobRouter;
