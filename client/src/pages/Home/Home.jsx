import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavBar, JobCard } from "../../components";

const Home = () => {
  const [cat, setCat] = useState("marketing");
  const [marketing, setMarketing] = useState([]);
  const [engineer, setEngineer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setCat(e.target.value);
  };

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
      setError(true);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);
  console.log(cat);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center mt-12">
        <div className="flex flex-col desk:flex-row justify-between gap-5 w-10/12 min-h-16">
          <input
            type="text"
            placeholder="Search"
            className="flex flex-1 border-2 border-[#1a70eb] px-4 rounded-xl "
          />
          <div className="flex flex-1 flex-row justify-center gap-12">
            <select
              id="category"
              value={cat}
              onChange={handleChange}
              className=" w-40 bg-transparent border-2 border-[#1a70eb] px-4 rounded-xl"
            >
              <option value="marketing">Marketing</option>
              <option value="engineer">Engineer</option>
            </select>

            <motion.button
              className="border-2 border-[#1a70eb] w-40 px-4 rounded-xl"
              whileHover={{ backgroundColor: "#1a70eb", color: 'white' }}
            >
              Find Jobs
            </motion.button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-9 min-w-full border-t-2 border-slate-500 pt-8 mt-12 ">
          {loading ? (
            <div>Loading...</div>
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
        </div>
      </div>
    </>
  );
};

export default Home;
