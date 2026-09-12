import useGetalladminjob from "@/hooks/getalladminjob";
import "../../styles/adminjobtable.css";
import { useSelector } from "react-redux";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Adminjobtable = () => {
  useGetalladminjob();

  const {
    companies = [],
    searchCompanyByText,
    serachcompanybytext,
  } = useSelector((state) => state.company);

  const { alladminjobs = [], searchjobbyText = "" } = useSelector(
    (state) => state.jobs || {},
  );

  const queryjob = (searchjobbyText || serachcompanybytext || "")
    .trim()
    .toLowerCase();

  // Always keep this as an array to avoid runtime crash when Redux state is not ready
  const filteredJobs = queryjob
    ? (alladminjobs || []).filter((jobs) =>
        (jobs?.position || "").toLowerCase().includes(queryjob),
      )
    : alladminjobs || [];

  const query = (searchCompanyByText || serachcompanybytext || "")
    .trim()
    .toLowerCase();

  const filteredCompanies = query
    ? companies.filter((company) =>
        (company?.name || "").toLowerCase().includes(query),
      )
    : companies;

  const navigate = useNavigate();

  return (
    <div className="adminjobtable__container">
      <table className="adminjobtable__table">
        <caption className="adminjobtable__caption">
          your recent uploaded jobs
        </caption>

        <thead className="adminjobtable__thead">
          <tr>
            <th className="adminjobtable__th">Company Name</th>
            <th className="adminjobtable__th">Role</th>
            <th className="adminjobtable__th">Date</th>
            <th className="adminjobtable__th">Action</th>
            <th className="adminjobtable__th">View No of Applicants</th>
          </tr>
        </thead>
        {filteredJobs.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={4} className="adminjobtable__empty">
                No job found
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job._id} className="adminjobtable__tr">
                <td className="adminjobtable__td">{job?.company?.name}</td>

                <td className="adminjobtable__td">{job?.position}</td>

                <td className="adminjobtable__td">
                  {new Date(job?.createdAt).toLocaleDateString()}
                </td>

                <td className="adminjobtable__td">
                  <button
                    className="adminjobtable__actionButton"
                    onClick={() => navigate(`/admin/jobs/${job?._id}`)}
                  >
                    Edit
                  </button>
                </td>
                <td className="adminjobtable__td" onClick={()=> navigate(`/admin/jobs/${job?._id}/applicant`)}>
                  {" "}
                  <button className="adminjobtable__action">
                    <Eye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default Adminjobtable;
