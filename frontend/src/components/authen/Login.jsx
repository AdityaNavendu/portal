/**
 * Frontend module: React 19, Vite, React Router aur Axios.
 * Use case: Ye file job portal ke browser-side UI aur API flow mein kaam karti hai.
 */

import React from "react";
import Navbar from "../compolite/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_URL } from "../../utils/data.js";
import { toast } from "sonner";
import { useAppContext } from "@/context/AppContext";
import {useEffect} from "react"
import "../../styles/auth.css";

/**
 * React component: `Login`.
 * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
 * Example: `<Login />`
 */
const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();
  const { loading, setLoading, user, setUser } = useAppContext();

  /**
   * React component: `changeEventHandler`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<changeEventHandler />`
   */
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  /**
   * React component: `submitHandler`.
   * Job portal ka ek UI section render karta hai aur application state ya user action ka response deta hai.
   * Example: `<submitHandler />`
   */
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_URL}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user);
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [])
  

  return (
    <div>
      <Navbar></Navbar>

      <div className="login-page">
        <form onSubmit={submitHandler} className="login-card" action="">
          <h1 className="login-title">Login</h1>

          <div className="login-section">
            <label className="login-label" htmlFor="email">
              Email
            </label>
            <input
              className="login-input"
              placeholder="Enter your email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              type="email"
              id="email"
            />
          </div>

          <div className="login-section">
            <label className="login-label" htmlFor="password">
              Password
            </label>
            <input
              className="login-input"
              placeholder="Enter your password"
              type="password"
              id="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
            />
          </div>

          <div className="login-role">
            <div className="login-role-group">
              <input
                className="login-radio"
                type="radio"
                name="role"
                value="applicant"
                checked={input.role === "applicant"}
                onChange={changeEventHandler}
                id="role-applicant"
              />
              <label htmlFor="role-applicant" className="login-label">
                applicant
              </label>
            </div>

            <div className="login-role-group">
              <input
                className="login-radio"
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={changeEventHandler}
                id="role-recruiter"
              />
              <label htmlFor="role-recruiter" className="login-label">
                recruiter
              </label>
            </div>
          </div>

          {loading ? (
            <div className="login-loading">
      loading...
            </div>
          ) : (
            <button type="submit" className="login-submit">
              Login
            </button>
          )}

          <p className="login-register">
            don't have an account?{" "}
            <Link to="/register">
              <button type="button">Register</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
