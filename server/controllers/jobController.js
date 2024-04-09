const axios = require("axios");
require("dotenv").config();

// CONTROLLER FOR FETCHING JOB POSTINGS FROM THE API
const searchJobs = async (req, res) => {
  const { page, results_per_page, what } = req.query;
  const marketingUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/${page}?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&results_per_page=${results_per_page}&what=${what}`;
  try {
    const response = await axios.get(marketingUrl);
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { searchJobs };
