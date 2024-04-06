import { useState, useEffect } from "react";
import axios from "axios";
import { NavBar, JobCard } from "../../components";

const Home = () => {
  const [cat, setCat] = useState("marketing");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    setCat(e.target.value);
  };

  const getJobs = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/jobsearch", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });
      setJobs(res.data);
      // console.log("jobs:", res.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching jobs:", error.message);
      setError(true)
    }
  };

  useEffect(() => {
    getJobs();
  }, []);
  console.log(cat);

  return (
    <>
      <NavBar />
      <div className="flex flex-col items-center">
        <div className="flex flex-row justify-between gap-5 w-1/2 min-h-16">
          <input
            type="text"
            placeholder="Search"
            className="border-2 border-[#1a70eb] px-4 rounded-xl focus:border-none"
          />
          <select
            id="category"
            value={cat}
            onChange={handleChange}
            className="w-32 bg-transparent border-2 border-[#1a70eb] px-4 rounded-xl"
          >
            <option value="marketing">Marketing</option>
            <option value="engineer">Engineer</option>
          </select>

          <button className="border-2 border-[#1a70eb] px-4 rounded-xl">
            Find Jobs
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
        <div className="flex flex-col items-center gap-9">
          {jobs &&
            jobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                company={job.company.display_name}
                location={job.location.display_name}
                description={job.description}
              />
            ))}
        </div>
          )}
      </div>
    </>
  );
};

export default Home;
