import Navbar from "./Navbar";
import Filter from "./Filter";
import Job from "./Job";
import "../../styles/jobs.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Jobs = () => {
  const { alljobs, searchquery } = useSelector((state) => state.jobs);

  const [filter, setFilter] = useState(alljobs);

  useEffect(() => {
    // No filter selected
    if (
      !searchquery ||
      (Array.isArray(searchquery) && searchquery.length === 0) ||
      (typeof searchquery === "string" && searchquery.trim() === "")
    ) {
      setFilter(alljobs);
      return;
    }

    const queryArray = Array.isArray(searchquery)
      ? searchquery
      : [searchquery];

    const filteredJobs = alljobs.filter((job) =>
      queryArray.some((query) => {
        const q = query.toLowerCase();

        return (
          job.title?.toLowerCase().includes(q) ||
          job.description?.toLowerCase().includes(q) ||
          job.location?.toLowerCase().includes(q) ||
          String(job.salary)?.toLowerCase().includes(q)
        );
      })
    );

    setFilter(filteredJobs);
  }, [alljobs, searchquery]);

  return (
    <div className="jobs-page">
      <Navbar />

      <div className="jobs-container">
        <div className="jobs-layout">
          {/* Left Side Filter */}
          <div className="jobs-filter">
            <Filter />
          </div>

          {/* Right Side Jobs */}
          <div className="jobs-results">
            {filter.length > 0 ? (
              <div className="jobs-grid">
                {filter.map((job) => (
                  <div key={job._id}>
                    <Job job={job} />
                  </div>
                ))}
              </div>
            ) : (
              <p>No jobs found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;