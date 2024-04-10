import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Select from "react-select";
// Icons import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// NavBar, Footer and Job posting container component imports
import { NavBar, Footer, JobCard, LoadMore } from "../../components";

const Home = () => {
  // store job category
  const [cat, setCat] = useState("marketing");
  // store fetched job postings
  const [postings, setPostings] = useState([]);
  // useStates for user experience
  const [loading, setLoading] = useState(true);
  const [extraloading, setExtraloading] = useState(false); // loading state for 'load more' action
  const [error, setError] = useState("");
  // store search query
  const [query, setQuery] = useState("");
  // set page (to fetch job posting)
  const [currentPage, setCurrentPage] = useState(1);

  // options for the select dropdown
  const selectOptions = [
    { value: "marketing", label: "Marketing" },
    { value: "engineer", label: "Engineer" },
  ];

  // function to handle change for category dropdown
  const handleChange = (selectedOption) => {
    setCat(selectedOption.value); // set category variable with the newly selected option
    setPostings([]); // postings array is cleared so that the previously selected category postings dont appear again
    setLoading(true);
    getJobs(1, 15, selectedOption.value); // getjobs function is called again to fetch jobs for the newly selected category
  };

  // function to store search query into variable
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  // Filtered job postings based on search query
  const searchedJobs =
    query.trim() === ""
      ? postings // checks if postings array is empty or not. If not empty, filter method is called
      : postings.filter(
          (job) =>
            (job.title &&
              job.title.toLowerCase().includes(query.toLowerCase())) ||
            (job.company.display_name &&
              job.company.display_name
                .toLowerCase()
                .includes(query.toLowerCase())) ||
            (job.location.display_name &&
              job.location.display_name
                .toLowerCase()
                .includes(query.toLowerCase()))
        );

  // function to fetch job postings from the server
  const getJobs = async (page = 1, resultsPerPage = 15, what = cat) => {
    try {
      const response = await axios.get(
        `https://jobsapply.vercel.app/api/jobs/getpostings?page=${page}&results_per_page=${resultsPerPage}&what=${what}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      setPostings((prevPostings) => [...prevPostings, ...response.data]); // avoids overwriting the existing data and stores the new data along with it
      setLoading(false);
      setExtraloading(false);
      // if no postings could be found
      if (response.data.length === 0) {
        setError("No job postings found");
      }
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
      // in case of error, an error message is displayed and postings array is cleared incase of network issues mid sessions
      setTimeout(() => {
        setError("Error fetching jobs. Please try again");
        setPostings([]);
        setLoading(false);
      }, 4000);
    }
  };

  // useEffect for fetching job postings
  useEffect(() => {
    getJobs(1, 15, cat);
  }, []);

  // function to load more jobs for the page
  const loadMoreJobs = useCallback(() => {
    setCurrentPage((prevPage) => prevPage + 1);
    setExtraloading(true);
    getJobs(currentPage + 1, 15, cat).finally(() => setExtraloading(false));
  }, [cat, currentPage, getJobs]);

  // styles for the category select component
  const selectStyle = {
    // main select box styling
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      border: "2px solid #1a70eb",
      height: "4rem",
      width: "10rem",
      borderRadius: "0.5rem",
    }),
    // options styling
    option: (styles) => {
      return {
        ...styles,
        backgroundColor: "white",
        color: "black",
        cursor: "pointer",
      };
    },
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-12 mb-16">
        {/* SEARCH BAR, CATEGORY SELECT AND BUTTONS  */}
        <div className="flex flex-col desk:flex-row justify-between gap-5 w-10/12 min-h-16">
          <input
            type="text"
            placeholder="Search"
            className="flex flex-1 border-2 border-secondary px-4 min-h-16 rounded-xl "
            onChange={handleSearch}
          />
          <div className="flex flex-1 flex-row justify-between desk:justify-center tab:justify-end gap-2 tab:gap-12">
            <Select
              defaultValue={selectOptions[0]}
              options={selectOptions}
              onChange={handleChange}
              styles={selectStyle}
            />
            <motion.button
              className="border-2 border-secondary desk:bg-primary bg-secondary desk:text-black text-primary w-40 px-4 rounded-xl"
              whileHover={{ backgroundColor: "#1a70eb", color: "white" }}
            >
              Find Jobs
            </motion.button>
          </div>
        </div>
        {/* JOB POSTINGS DIV  */}
        <div className="flex flex-col items-center min-h-screen gap-9 min-w-full border-t-2 border-slate-300 pt-16 mt-12">
          {/* RENDER THE JOB POSTINGS  */}
          {loading ? (
            // display loading icon until jobs postings are fetched
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="3x"
              style={{ color: "#1a70eb" }}
            />
          ) : (
            // display the fetched job postings
            searchedJobs.length > 0 && (
              <>
                {searchedJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    title={job.title}
                    company={job.company.display_name}
                    location={job.location.display_name}
                    maxsalary={job.salary_max}
                    description={job.description}
                  />
                ))}
                {/* LOAD MORE BUTTON  */}
                <LoadMore onClick={loadMoreJobs} loading={extraloading} />
              </>
            )
          )}
          {/* IN CASE OF ERROR */}
          {error && (
            <div className="flex flex-col items-center mt-4">
              <div className="text-red-500 mb-2">{error}</div>
              <button
                className="border-2 border-secondary px-4 py-2 rounded-xl"
                onClick={() => {
                  setLoading(true);
                  setError("");
                  getJobs();
                }}
              >
                Retry
              </button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
