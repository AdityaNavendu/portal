import Navbar from "../compolite/Navbar";
import "../../styles/companies.css";
import CompanyTable from "./companytable";
import { useNavigate } from "react-router-dom";
import getallcompanies from "@/hooks/getallcompanies";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setSearchCompany } from "@/redux/Companyslice";
const Companies = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

useEffect(() => {
  dispatch(setSearchCompany(input));
}, [input, dispatch])


const inputhandler = (e) => {
  setInput(e.target.value);
};
  getallcompanies()
  return (
    <div>
      <Navbar />
      <div className="companies__root">
        <div className="companies__search">
          <input type="text" placeholder="Filter by name" onChange={inputhandler} />
          <button onClick={() => navigate("/admin/companies/create")}>
            ADD COMPANY
          </button>
        </div>
        <div>
          <CompanyTable />
        </div>
      </div>
    </div>
  );
};

export default Companies;
