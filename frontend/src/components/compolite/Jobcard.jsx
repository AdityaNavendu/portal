import "../../styles/jobcard.css";
import { useNavigate } from "react-router-dom";

const Jobcard = ({ job }) => { 
  const selectedJob = job ;
  console.log("Jobcard component received job:", selectedJob); // Debugging line to check the job prop
  const safeJob = selectedJob ?? {};
  const navigate = useNavigate();

  return (
    <div className="jobcard-card" onClick={() => navigate(`/description/${safeJob._id}`)}>
      {/* Company */}
      <div className="jobcard-company-info">
        <h2 className="jobcard-company">{safeJob?.company?.name || "Company"}</h2>
        <p className="jobcard-country">{safeJob?.company?.country || "Country"}</p>
      </div>

      {/* Job Details */}
      <div className="jobcard-content">
        <h1 className="jobcard-job-title">{safeJob?.title || "Job Title"}</h1>

        <p className="jobcard-desc">
          {safeJob?.description?.length > 100
            ? safeJob?.description?.substring(0, 100) + "..."
            : safeJob?.description}
        </p>
      </div>


      {/* Tags */}
      <div className="jobcard-badges">
        <span className="jobcard-badge-pill jobcard-badge-blue">
      {safeJob.position}
        </span>
        <span className="jobcard-badge-pill jobcard-badge-green">{safeJob.salary || "Not Specified"}</span>
        <span className="jobcard-badge-pill jobcard-badge-purple">{safeJob.location || "Not Specified"}</span>
        <span className="jobcard-badge-pill jobcard-badge-orange">{safeJob.jobtype || "Not Specified"}</span>
      </div>

      {/* Footer */}
      <div className="jobcard-actions">
        <span className="jobcard-time">{safeJob.created_at || ""}</span>
        <button className="jobcard-btn-save">Apply Now</button>
      </div>
    </div>
  );
};

export default Jobcard;