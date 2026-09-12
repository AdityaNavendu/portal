import { useState } from "react";

import Navbar from "../compolite/Navbar.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_URL } from "../../utils/data.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../redux/authslice.js";
import { useEffect } from "react";
import "../../styles/register.css";

const Register = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
    resumeFile: null,
    profilePictureFile:"",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  
  const profilePictureChangeHandler = (e) => {
    setInput({ ...input, profilePictureFile: e.target.files?.[0] || null });
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phoneNumber", input.phoneNumber);

    if (input.resumeFile) {
      formData.append("resume", input.resumeFile);
    }
    if (input.profilePictureFile) {
      formData.append("profilepicture", input.profilePictureFile);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_URL}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
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


      <div className="register-page">
        <form onSubmit={submitHandler} action="" className="register-card">
          <h1 className="register-title">
            <span>Register</span>
          </h1>

          <div className="register-fields">
            <div className="register-field">
              <label className="register-label" htmlFor="name">
                Name
              </label>
              <input
                className="register-input"
                placeholder="Enter your name"
                value={input.fullname}
                name="fullname"
                onChange={changeEventHandler}
                type="text"
                id="name"
              />
            </div>

            <div className="register-field">
              <label className="register-label" htmlFor="email">
                Email
              </label>
              <input
                className="register-input"
                placeholder="Enter your email"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
                type="email"
                id="email"
              />
            </div>

            <div className="register-field">
              <label className="register-label" htmlFor="password">
                Password
              </label>
              <input
                className="register-input"
                placeholder="Enter your password"
                type="password"
                id="password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
              />
            </div>

            <div className="register-field">
              <label className="register-label" htmlFor="phoneNumber">
                Phone number
              </label>
              <input
                className="register-input"
                placeholder="Enter your phone number"
                type="number"
                id="phoneNumber"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
              />
            </div>

            <div className="register-role">
              <div className="register-radio-row">
                <input
                  className="register-radio"
                  type="radio"
                  name="role"
                  value="applicant"
                  checked={input.role === "applicant"}
                  onChange={changeEventHandler}
                  id="role-applicant"
                />
                <label className="register-label" htmlFor="role-applicant">
                  applicant
                </label>

                <input
                  className="register-radio"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  id="role-recruiter"
                />
                <label className="register-label" htmlFor="role-recruiter">
                  recruiter
                </label>
              </div>

              <div className="register-photo">
                <label className="register-label">profile photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={profilePictureChangeHandler}
                />
              </div>

            </div>
          </div>

          {loading ? (
            <div className="register-loading">
        loading
            </div>
          ) : (
            <button type="submit" className="register-submit">
              Register
            </button>
          )}

          <p className="register-login">
            Already have an account?
            <Link to="/login">
              <button type="button">Login</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

