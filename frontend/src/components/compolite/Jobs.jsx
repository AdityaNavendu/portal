/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import Navbar from "./Navbar";
import Filter from "./Filter";
import Job from "./Job";
import "../../styles/jobs.css";
import { useMemo } from "react";
import { useAppContext } from "@/context/AppContext";
import Getalljob from "@/hooks/Getalljob";
import { jobFilters } from "@/utils/jobFilters";

/**
 * React component: `Jobs`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Jobs />`
 */
const Jobs = () => {
  const { loading, error } = Getalljob();
  const { alljobs, searchquery } = useAppContext();

  /**
   * React component: `filteredJobs`.
   * Renders one UI section of the job portal and responds to application state or user actions.
   * Example: `<filteredJobs />`
   */
  const filteredJobs = useMemo(() => {
    /**
     * React component: `selectedValues`.
     * Renders one UI section of the job portal and responds to application state or user actions.
     * Example: `<selectedValues />`
     */
    const selectedValues = Array.isArray(searchquery) ? searchquery : [];
    if (selectedValues.length === 0) return alljobs;

    /**
     * React component: `selectedGroups`.
     * Renders one UI section of the job portal and responds to application state or user actions.
     * Example: `<selectedGroups />`
     */
    const selectedGroups = jobFilters
      .map(({ filterType, array }) => ({
        filterType,
        values: selectedValues.filter((value) => array.includes(value)),
      }))
      .filter(({ values }) => values.length > 0);

    return alljobs.filter((job) =>
      selectedGroups.every(({ filterType, values }) =>
        values.some((value) => {
          if (filterType === "Location") {
            return String(job.location ?? "").toLowerCase().includes(value.toLowerCase());
          }

          if (filterType === "Technology") {
            /**
             * React component: `searchableText`.
             * Renders one UI section of the job portal and responds to application state or user actions.
             * Example: `<searchableText />`
             */
            const searchableText = [
              job.title,
              job.description,
              job.position,
              ...(Array.isArray(job.requirements) ? job.requirements : [job.requirements]),
            ]
              .join(" ")
              .toLowerCase();
            return searchableText.includes(value.toLowerCase());
          }

          /**
           * React component: `amount`.
           * Renders one UI section of the job portal and responds to application state or user actions.
           * Example: `<amount />`
           */
          const amount = Number(filterType === "Experience" ? job.experience : job.salary);
          if (!Number.isFinite(amount)) return false;

          const [lowerBound, upperBound] = value.match(/\d+(?:\.\d+)?/g).map(Number);
          return amount >= lowerBound && (upperBound === undefined || amount < upperBound);
        }),
      ),
    );
  }, [alljobs, searchquery]);

  return (
    <div className="jobs-page">
      <Navbar />

      <div className="jobs-container">
        <div className="jobs-layout">

          <div className="jobs-filter">
            <Filter />
          </div>


          <div className="jobs-results">
            {loading ? (
              <p>Loading jobs...</p>
            ) : error ? (
              <p>Error loading jobs: {error.message}</p>
            ) : filteredJobs.length > 0 ? (
              <div className="jobs-grid">
                {filteredJobs.map((job) => (
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