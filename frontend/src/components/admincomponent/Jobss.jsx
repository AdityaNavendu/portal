import React, { useEffect, useState } from "react";
import Navbar from "../compolite/Navbar";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/adminjob.css";
import Adminjobtable from "./Adminjobtable";
import { setSearchJob } from "@/redux/jobslice";



const Jobss = () => {
  
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(setSearchJob(input));


}, [input])


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