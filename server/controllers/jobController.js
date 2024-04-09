const axios = require("axios");
require("dotenv").config();

// STORE API URLS FOR FETCHING JOB POSTING INFO
const marketingUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/2?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&what=marketing`;
const engineerUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/2?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&what=engineer`;

// CONTROLLER FOR MARKETING JOBS
const searchMarketing = async (req, res) => {
  try {
    const response = await axios.get(marketingUrl);
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
;  }
};

// CONTROLLER FOR ENGINEER JOBS
const searchEngineer = async (req, res) => {
  try {
    const response = await axios.get(engineerUrl);
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { searchMarketing, searchEngineer };
