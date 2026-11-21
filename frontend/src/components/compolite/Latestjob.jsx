/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import Jobcard from "./Jobcard";
import "../../styles/job.css";
import { useAppContext } from "@/context/AppContext";


/**
 * React component: `Latestjob`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Latestjob />`
 */
const Latestjob = () => {
  const { alljobs } = useAppContext();  
  return (
    <div className="latestjob-wrapper">
      <h2 className="latestjob-title">
        <span className="latestjob-title-highlight">Latest &amp; top</span> jobs
        opening
      </h2>

      <div className="latestjob-grid">
        {alljobs.length===0?(<span>no job</span>):(alljobs.slice(0, 6).map((job,index) => job?._id? (
          <Jobcard key={job._id} job={job} ></Jobcard>
        ):(
          <span key={index}>invalid</span>
        )))}
      </div>
    </div>
  );
};

export default Latestjob;
