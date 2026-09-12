import Navbar from "../compolite/Navbar";
import { useEffect, useMemo, useState } from "react";
import "../../styles/postjob.css";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { JOB_API_URL } from "../../utils/data";
import { useNavigate, useParams } from "react-router-dom";


const PostJob = () => {
  const { id } = useParams(); // if provided => edit mode
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    location: "",
    salary: "",
    jobtype: "",
    company_Id: "",
    position: "",
    experience: "",
  });

  const initialInput = useMemo(
    () => ({
      title: "",
      description: "",
      requirements: "",
      location: "",
      salary: "",
      jobtype: "",
      company_Id: "",
      position: "",
      experience: "",
    }),
    [],
  );

  const { companies = [] } = useSelector((state) => state.company);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const selectChangeHandler = (companyId) => {
    setInput((prev) => ({ ...prev, company_Id: companyId }));
  };

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Load previous job data when in edit mode
  useEffect(() => {
    let cancelled = false;

    const fetchJob = async () => {
      if (!id) return;
      setFetching(true);
      try {
        const res = await axios.get(`${JOB_API_URL}/getjobbyid/${id}`, {
          withCredentials: true,
        });

        const job = res.data?.job;
        if (!job || cancelled) return;

        setInput({
          title: job.title ?? "",
          description: job.description ?? "",
          requirements: Array.isArray(job.requirements)
            ? job.requirements.join(",")
            : (job.requirements ?? ""),
          location: job.location ?? "",
          salary: job.salary ?? "",
          jobtype: job.jobtype ?? "",
          company_Id: job.company?._id ?? job.company ?? "",
          position: job.position ?? "",
          experience: job.experience ?? "",
        });
      } catch (err) {
        console.error(err);
        toast.error(err?.response?.data?.message || "Failed to load job");
      } finally {
        if (!cancelled) setFetching(false);
      }
    };

    fetchJob();

    return () => {
      cancelled = true;
    };
  }, [id, initialInput]);

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (id) {
      
        const res = await axios.post(`${JOB_API_URL}/postjob`, input, {

          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        if (res.data?.success) {
          toast.success(res.data.message || "Job saved successfully");
          navigate("/admin/jobs");
          return;
        }

        toast.error(res.data?.message || "Failed to save job");
        return;
      }


      // create
      const res = await axios.post(`${JOB_API_URL}/postjob`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success("Job Posted Successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Failed to submit job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="postjob__container">
        <form action="" className="postjob__form" onSubmit={onsubmitHandler}>
          <div className="postjob__card">
            <h2 className="postjob__heading">
              {id ? "Edit Job" : "Post New Job"}
            </h2>

            <div className="postjob__root">
              <div className="postjob__title">
                <label>Job Title</label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={handleChange}
                  disabled={fetching}
                />
              </div>

              <div className="postjob__description">
                <label>Job Description</label>
                <input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={handleChange}
                  placeholder="Enter job description"
                  disabled={fetching}
                />
              </div>

              <div className="postjob__requirements">
                <label>Job Requirements</label>
                <input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={handleChange}
                  placeholder="React, Node, SQL"
                  disabled={fetching}
                />
              </div>

              <div className="postjob__location">
                <label>Job Location</label>
                <input
                  type="text"
                  name="location"
                  value={input.location}
                  onChange={handleChange}
                  disabled={fetching}
                />
              </div>

              <div className="postjob__salary">
                <label>Job Salary</label>
                <input
                  type="text"
                  name="salary"
                  value={input.salary}
                  onChange={handleChange}
                  disabled={fetching}
                />
              </div>

              <div className="postjob__jobtype">
                <label>Job Type</label>
                <select
                  name="jobtype"
                  value={input.jobtype}
                  onChange={handleChange}
                  disabled={fetching}
                >
                  <option value="" disabled>
                    Select job type
                  </option>
                  <option value="fulltime">fulltime</option>
                  <option value="parttime">parttime</option>
                </select>
              </div>

              <div className="postjob__position">
                <label>Job Position</label>
                <input
                  type="text"
                  name="position"
                  value={input.position}
                  onChange={handleChange}
                  disabled={fetching}
                />
              </div>

              <div className="postjob__experience">
                <label>Job Experience</label>
                <input
                  type="text"
                  name="experience"
                  value={input.experience}
                  onChange={handleChange}
                  disabled={fetching}
                />
              </div>

              <div>
                <select
                  className="company-select"
                  value={input.company_Id}
                  onChange={(e) => selectChangeHandler(e.target.value)}
                  disabled={fetching}
                >
                  <option value="" disabled>
                    Select a Company
                  </option>

                  {companies.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="postjob__submit"
                disabled={loading || fetching}
              >
                {loading
                  ? id
                    ? "Updating..."
                    : "Posting..."
                  : id
                    ? "Update"
                    : "Submit"}
              </button>
            

              {companies.length === 0 && (
                <p className="postjob__nojob">No jobs found</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
