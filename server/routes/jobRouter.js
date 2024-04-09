const express = require("express");
const jobRouter = express.Router();

// IMPORT CONTROLLERS
const { searchMarketing, searchEngineer } = require("../controllers/jobController");

jobRouter.route("/marketing").get(searchMarketing);
jobRouter.route("/engineer").get(searchEngineer);

module.exports = jobRouter;
