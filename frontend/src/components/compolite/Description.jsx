import "../../styles/description.css";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { JOB_API_URL, APPLICATION_API_URL } from "@/utils/data";
import { useAppContext } from "@/context/AppContext";
import Navbar from "./Navbar";

const Description = () => {
  const { singlejob, user, setSingleJob } = useAppContext();
  const { jobId } = useParams();
  const navigate = useNavigate();

  const isApplied =
    singlejob?.applicants?.some(
      (applicant) => (applicant?._id || applicant) === user?._id
    ) || false;

  const applyjobhandler = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${APPLICATION_API_URL.replace(
          "/api/application",
          "/api/applicants"
        )}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        const jobRes = await axios.get(
          `${JOB_API_URL}/getjobbyid/${jobId}`,
          {
            withCredentials: true,
          }
        );

        if (jobRes.data.success) {
          setSingleJob(jobRes.data.job);
        }

        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_URL}/getjobbyid/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setSingleJob(res.data.job);
        } else {
          setSingleJob(null);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, setSingleJob]);

  return (
    <div>
         <Navbar/>
    <div className="description-page">
   
      <div className="description-container">
        <div className="description-header">
          <div>
            <h1 className="description-title">
              {singlejob?.title || "Loading..."}
            </h1>

            <div className="description-badges">
              <span className="description-badge badge-blue">
                {singlejob?.position}
              </span>

              <span className="description-badge badge-green">
                ₹{singlejob?.salary}
              </span>

              <span className="description-badge badge-purple">
                {singlejob?.location}
              </span>

              <span className="description-badge badge-orange">
                {singlejob?.jobtype}
              </span>
            </div>
          </div>

          <button
            onClick={!isApplied ? applyjobhandler : undefined}
            disabled={isApplied}
            className="description-button"
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </button>
        </div>

        <h2 className="description-section-title">
          {singlejob?.description}
        </h2>

        <div className="description-list">
          <div className="description-row">
            <span className="description-key">Role:</span>
            <span className="description-value">{singlejob?.title}</span>
          </div>

          <div className="description-row">
            <span className="description-key">Position:</span>
            <span className="description-value">{singlejob?.position}</span>
          </div>

          <div className="description-row">
            <span className="description-key">Salary:</span>
            <span className="description-value">
              ₹{singlejob?.salary}
            </span>
          </div>

          <div className="description-row">
            <span className="description-key">Location:</span>
            <span className="description-value">
              {singlejob?.location}
            </span>
          </div>

          <div className="description-row">
            <span className="description-key">Requirements:</span>
            <span className="description-value">
              {Array.isArray(singlejob?.requirements)
                ? singlejob.requirements.join(", ")
                : singlejob?.requirements}
            </span>
          </div>

          <div className="description-row">
            <span className="description-key">Experience:</span>
            <span className="description-value">
              {singlejob?.experience} Years
            </span>
          </div>

          <div className="description-row">
            <span className="description-key">Job Type:</span>
            <span className="description-value">
              {singlejob?.jobtype}
            </span>
          </div>

          <div className="description-row">
            <span className="description-key">Total Applicants:</span>
            <span className="description-value">
              {singlejob?.applicants?.length || 0}
            </span>
          </div>

          <div className="description-row">
            <span className="description-key">Total Position:</span>
            <span className="description-value">
              {singlejob?.position}
            </span>
          </div>

          <div className="description-row">
            <span className="description-key">Posted On:</span>
            <span className="description-value">
              {singlejob?.createdAt
                ? new Date(singlejob.createdAt)
                    .toISOString()
                    .split("T")[0]
                : "-"}
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>

  );
};

export default Description;