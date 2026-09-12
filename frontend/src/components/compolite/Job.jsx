import { Bookmark } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../../styles/jobcomponent.css";
import { useState } from "react";
const Job = ({ job }) => {
  const navigate = useNavigate();
  const jobId = job._id;
  console.log("Job component received job:", job); // Debugging line to check the job prop

  const [isbookmarked, setIsBookmarked] = useState(false);
  const daysago= (mongodbTime) =>{
    const date = new Date(mongodbTime);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
  }

  return (
    <div className="jobcomponent-card">
      
      <div className="jobcomponent-header">
        <p className="jobcomponent-time">{daysago(job?.createdAt)} days ago</p>

        <button className="jobcomponent-bookmark-btn" onClick={() => setIsBookmarked(!isbookmarked)}>
          <Bookmark size={18} />
        </button>
      </div>

      {/* Company Info */}
      <div className="jobcomponent-main">
        <img
          src={job?.company?.logo}
          alt="company"
          className="jobcomponent-avatar"
        />

        <div>
          <h2 className="jobcomponent-company">{job?.company?.name}</h2>
          <p className="jobcomponent-country">{job?.country}</p>
          <h1 className="jobcomponent-title">{job?.title}</h1>
        </div>
      </div>

      {/* Description */}
      <p className="jobcomponent-desc">
        {job?.description?.length > 100
          ? job?.description?.substring(0, 100) + "..."
          : job?.description}    
      </p>

      {/* Badges */}
      <div className="jobcomponent-badges">
        <span className="jobcomponent-badge-pill jobcomponent-badge-blue">
      {job?.position} OPEN POSITION
        </span>
        <span className="jobcomponent-badge-pill jobcomponent-badge-green">
          {job?.salary || "Not Specified"} LPA
        </span>
        <span className="jobcomponent-badge-pill jobcomponent-badge-purple">
          {job?.location || "Not Specified"}
        </span>
        <span className="jobcomponent-badge-pill jobcomponent-badge-orange">
          {job?.jobtype || "Not Specified"}
        </span>
      </div>

      {/* Actions */}
      <div className="jobcomponent-actions">
        <button
          className="jobcomponent-btn-details"
          onClick={() => navigate(`/description/${jobId}`)}
        >
          View Details
        </button>

        <button className="jobcomponent-btn-save">Save For Later</button>
      </div>
    </div>
  );
};

export default Job;