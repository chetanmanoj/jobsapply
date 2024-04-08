import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Select from "react-select";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

// NavBar and Job posting container component imports
import { NavBar, JobCard } from "../../components";

const Home = () => {
  const [cat, setCat] = useState("marketing");
  const [marketing, setMarketing] = useState([]);
  const [engineer, setEngineer] = useState([]);
  // useStates for user experience
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasmore] = useState(true);
  const [error, setError] = useState("");

  const selectOptions = [
    { value: "marketing", label: "Marketing" },
    { value: "engineer", label: "Engineer" },
  ];

  const handleChange = (selectedOption) => {
    setCat(selectedOption.value);
  };

  // function to fetch job postings from the server
  const getJobs = async () => {
    try {
      const [marketingRes, engineerRes] = await Promise.all([
        axios.get("http://127.0.0.1:8000/api/jobs/marketing", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }),
        axios.get("http://127.0.0.1:8000/api/jobs/engineer", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }),
      ]);
      setMarketing(marketingRes.data);
      setEngineer(engineerRes.data);
      // console.log("jobs:", res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
      setTimeout(() => {
        setError("Couldn't display job details. Please try again");
        setLoading(false);
      }, 2000);
    }
  };

  // useEffect for fetching job postings
  useEffect(() => {
    getJobs();
  }, []);

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
      <div className="flex flex-col items-center mt-12">
        {/* SEARCH BAR, CATEGORY SELECT AND BUTTONS  */}
        <div className="flex flex-col desk:flex-row justify-between gap-5 w-10/12 min-h-16">
          <input
            type="text"
            placeholder="Search"
            className="flex flex-1 border-2 border-secondary px-4 min-h-16 rounded-xl "
          />
          <div className="flex flex-1 flex-row justify-between tab:justify-center gap-2 tab:gap-12">
            <Select
              defaultValue={selectOptions[0]}
              // label="Single select"
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
        <div className="flex flex-col items-center gap-9 min-w-full border-t-2 border-slate-300 pt-16 mt-12  ">
          {/* <InfiniteScroll
            dataLength={marketing.length}
            next={getJobs}
            hasMore={hasmore}
            loader={<h4>Loading...</h4>}
            endMessage={<p>No more items</p>}
          > */}
          {loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              spin
              size="3x"
              style={{ color: "#1a70eb" }}
            />
          ) : (
            <>
              {(() => {
                switch (cat) {
                  case "marketing":
                    return marketing.map((job) => (
                      <JobCard
                        key={job.id}
                        title={job.title}
                        company={job.company.display_name}
                        location={job.location.display_name}
                        minsalary={job.salary_min}
                        maxsalary={job.salary_max}
                        description={job.description}
                      />
                    ));
                  case "engineer":
                    return engineer.map((job) => (
                      <JobCard
                        key={job.id}
                        title={job.title}
                        company={job.company.display_name}
                        location={job.location.display_name}
                        minsalary={job.salary_min}
                        maxsalary={job.salary_max}
                        description={job.description}
                      />
                    ));
                  default:
                    return null;
                }
              })()}
            </>
          )}
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
          {/* </InfiniteScroll> */}
        </div>
      </div>
    </>
  );
};

export default Home;
