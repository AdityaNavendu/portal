import Navbar from "./Navbar";
import Job from "./Job";
import "../../styles/browse.css";
import Getalljob from "../../hooks/Getalljob";
import { useSearchParams } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";

const Browse = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "";
  const keyword = searchParams.get("keyword") || "";

  const { loading, error } = Getalljob(category || keyword);
  const { alljobs } = useAppContext();

  return (
    <div className="browse-page">
      <Navbar />

      <div className="browse-container">
        <h1 className="browse-title">Search Result ({alljobs?.length || 0})</h1>

        <div className="browse-grid">
          {loading ? (
            <p>Loading jobs...</p>
          ) : error ? (
            <p>Error loading jobs: {error.message}</p>
          ) : alljobs?.length ? (
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
