/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import Navbar from "../compolite/Navbar";
import "../../styles/companies.css";
import CompanyTable from "./companytable";
import { useNavigate } from "react-router-dom";
import getallcompanies from "@/hooks/getallcompanies";
import { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
/**
 * React component: `Companies`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Companies />`
 */
const Companies = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { setSearchCompanyByText } = useAppContext();

useEffect(() => {
  setSearchCompanyByText(input);
}, [input, setSearchCompanyByText])


/**
 * React component: `inputhandler`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<inputhandler />`
 */
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
