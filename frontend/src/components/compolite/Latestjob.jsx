import Jobcard from "./Jobcard";
import "../../styles/job.css";
import { useAppContext } from "@/context/AppContext";


/**
 * Utility/function: `Latestjob`.
 * `Latestjob` is component/hook ke focused UI ya state operation ko execute karta hai.
 * Example: `Latestjob(actual arguments);`
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
