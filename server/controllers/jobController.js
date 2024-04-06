const axios = require("axios");
require("dotenv").config();

// const baseUrl = `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&results_per_page=1&what=javascript%20developer&content-type=application/json`
// const baseUrl = "https://api.adzuna.com/v1/api"
const baseUrl = `https://api.adzuna.com/v1/api/jobs/gb/search/2?app_id=${process.env.APP_ID}&app_key=${process.env.API_KEY}&results_per_page=6&what=marketing&where=uk`

const searchJobs = async (req, res) => {
  try {
    const { what, where } = req.body;

    const params = {
      app_id: process.env.APP_ID,
      app_key: process.env.API_KEY,
      what: "marketing",
      where: "UK",
    };
    const response = await axios.get(baseUrl);
    res.json(response.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {searchJobs}