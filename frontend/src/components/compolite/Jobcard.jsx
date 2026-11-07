import "../../styles/jobcard.css";
import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";

const Jobcard = ({ job }) => { 
  const selectedJob = job ;
  console.log("Jobcard component received job:", selectedJob);
  const safeJob = selectedJob ?? {};
  const navigate = useNavigate();
  const {
    user,
    bookmarkedJobIds,
    bookmarksLoading,
    toggleBookmark,
  } = useAppContext();
  const [bookmarkPending, setBookmarkPending] = useState(false);
  const isBookmarked = bookmarkedJobIds.includes(String(safeJob._id));

  const bookmarkJob = async (event) => {
    event.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }

    setBookmarkPending(true);
    try {
      await toggleBookmark(safeJob);
    } catch (error) {
      toast.error(error.message || "Unable to update saved jobs");
    } finally {
      setBookmarkPending(false);
    }
  };

  return (
    <div className="jobcard-card" onClick={() => navigate(`/description/${safeJob._id}`)}>

      <div className="jobcard-company-info">
        <h2 className="jobcard-company">{safeJob?.company?.name || "Company"}</h2>
        <p className="jobcard-country">{safeJob?.company?.country || "Country"}</p>
      </div>


      <div className="jobcard-content">
        <h1 className="jobcard-job-title">{safeJob?.title || "Job Title"}</h1>

        <p className="jobcard-desc">
          {safeJob?.description?.length > 100
            ? safeJob?.description?.substring(0, 100) + "..."
            : safeJob?.description}
        </p>
      </div>



      <div className="jobcard-badges">
        <span className="jobcard-badge-pill jobcard-badge-blue">
      {safeJob.position}
        </span>
        <span className="jobcard-badge-pill jobcard-badge-green">{safeJob.salary || "Not Specified"}</span>
        <span className="jobcard-badge-pill jobcard-badge-purple">{safeJob.location || "Not Specified"}</span>
        <span className="jobcard-badge-pill jobcard-badge-orange">{safeJob.jobtype || "Not Specified"}</span>
      </div>


      <div className="jobcard-actions">
        <span className="jobcard-time">{safeJob.created_at || ""}</span>
        <button
          type="button"
          className="jobcard-bookmark-btn"
          aria-label={isBookmarked ? "Remove from saved jobs" : "Save job"}
          aria-pressed={isBookmarked}
          disabled={bookmarkPending || bookmarksLoading}
          onClick={bookmarkJob}
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
        <button className="jobcard-btn-save">Apply Now</button>
      </div>
    </div>
  );
};

export default Jobcard;