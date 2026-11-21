/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import React, { useEffect, useState } from "react";
import Navbar from "../compolite/Navbar";

import { useNavigate } from "react-router-dom";
import "../../styles/adminjob.css";
import Adminjobtable from "./Adminjobtable";
import { useAppContext } from "@/context/AppContext";



/**
 * React component: `Jobss`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Jobss />`
 */
const Jobss = () => {
  
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const { setSearchJobByText } = useAppContext();
useEffect(() => {
  setSearchJobByText(input);


}, [input, setSearchJobByText])


  return (
    <div>
      <Navbar />
      <div className="jobss__root">
        <div className="jobss__search">
          <input
            className=""
            placeholder="Filter by Name & Jobs"
            onChange={(e) => setInput(e.target.value)}
          ></input>
          <button className="jobss__search__button" onClick={() => navigate("/admin/jobs/create")}>
            Post new Job
          </button>
        </div>
        <div className="overflow-x-auto">
         <Adminjobtable/>
        </div>
        <div style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Jobss;