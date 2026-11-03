import "../../styles/create.css";
import Navbar from "../compolite/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_URL } from "../../utils/data";
import { toast } from "sonner";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";

const Companycreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const { setSingleCompany } = useAppContext();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_URL}/register`,
        { companyName },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      if (res?.data?.success) {
        toast.success("Company created successfully");
        setSingleCompany(res.data.company);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.error("res.error.message");
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Failed to register company",
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div className="company-create-container">
        <div className="company-heading">
          <h1>Company Name</h1>
          <p>Company Description</p>
        </div>

        <div className="company-form">
          <label>Company Name</label>
          <input
            type="text"
            placeholder="Company Name"
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <div className="button-group">
            <button
              className="cancel-btn"
              onClick={() => navigate("/admin/companies")}
            >
              Cancel
            </button>

            <button className="continue-btn" onClick={registerNewCompany}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companycreate;
