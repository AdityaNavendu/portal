import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Job from "./Job";
import { useAppContext } from "@/context/AppContext";
import "../../styles/browse.css";
import "../../styles/savedjobs.css";

const SavedJobs = () => {
  const { user, savedJobs, bookmarksLoading, bookmarksError } =
    useAppContext();
const navigate = useNavigate();
  if (!user) {
    navigate("/login");
    return;
  }

  return (
    <div className="browse-page">
      <Navbar />
      <div className="browse-container">
        <h1 className="browse-title">Saved Jobs ({savedJobs.length})</h1>

        {bookmarksLoading ? (
          <p>Loading saved jobs...</p>
        ) : bookmarksError ? (
          <p className="saved-jobs__message" role="alert">
            {bookmarksError}
          </p>
        ) : savedJobs.length > 0 ? (
          <div className="browse-grid">
            {savedJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))}
          </div>
        ) : (
          <p className="saved-jobs__message">You have no saved jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
