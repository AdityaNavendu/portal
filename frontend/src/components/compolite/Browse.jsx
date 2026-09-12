import Navbar from "./Navbar";
import Job from "./Job";
import "../../styles/browse.css";
import { useSelector } from "react-redux";
import Getalljob from "../../hooks/Getalljob";
import { useDispatch } from "react-redux";
import { setSearchquery } from "@/redux/jobslice";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";

  Getalljob({ keyword: category });
  const { alljobs } = useSelector((store) => store.jobs);
  const dispatch = useDispatch();


 
  useEffect(() => {
    
  
    return () => {
      dispatch(setSearchquery(""));
    }
  }, [])
  

  return (
    <div className="browse-page">
      <Navbar />

      <div className="browse-container">
        <h1 className="browse-title">Search Result ({alljobs?.length || 0})</h1>

        <div className="browse-grid">
          {alljobs?.length ? (
            alljobs.map((job) => <Job key={job._id} job={job} />)
          ) : (
            <p>No jobs available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;


