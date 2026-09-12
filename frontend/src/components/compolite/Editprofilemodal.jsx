import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { USER_API_URL } from "../../utils/data.js";
import { toast } from "sonner";
import { setUser } from "../../redux/authslice.js";

import "../../styles/editprofilemodal.css";

const Editprofilemodal = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    resume: user?.profile?.resume || "",
    profilepicture: user?.profile?.profilepicture || "",
  });

  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const filechangeHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      resume: e.target.files?.[0],
    }));
  };

  const profilePicHandler = (e) => {
    setInput((prev) => ({
      ...prev,
      profilepicture: e.target.files?.[0],
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
  

    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);

    if (input.resume) formData.append("resume", input.resume);
    if (input.profilepicture) formData.append("profilepicture", input.profilepicture);

    try {
      setLoading(true);

      const res = await axios.post(`${USER_API_URL}/update/profile`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!open || !user) return null;

  return (
    <div
      className="editprofilemodal__overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="editprofilemodal__content" role="dialog" aria-modal="true">
        <div className="editprofilemodal__header">
          <div className="editprofilemodal__title">Edit Profile</div>
        </div>

        <form onSubmit={submitHandler} className="editprofilemodal__form">
          <div className="editprofilemodal__grid editprofilemodal__grid--sm2">
            <div className="editprofilemodal__spaceY2">
              <label className="editprofilemodal__label">Name</label>
              <input
                type="text"
                name="fullname"
                value={input.fullname}
                onChange={handleInputChange}
                className="editprofilemodal__input"
              />
            </div>

            <div className="editprofilemodal__spaceY2">
              <label className="editprofilemodal__label">Email</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleInputChange}
                className="editprofilemodal__input"
              />
            </div>

            <div className="editprofilemodal__spaceY2">
              <label className="editprofilemodal__label">Phone</label>
              <input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleInputChange}
                className="editprofilemodal__input"
              />
            </div>
          </div>

          <div className="editprofilemodal__mt5">
            <label className="editprofilemodal__label">Bio</label>
            <textarea
              name="bio"
              value={input.bio}
              onChange={handleInputChange}
              className="editprofilemodal__textarea"
            />
          </div>

          <div className="editprofilemodal__mt5 editprofilemodal__grid-gap5 editprofilemodal__grid--sm2">
            <div>
              <label className="editprofilemodal__label">Skills</label>
              <input
                type="text"
                name="skills"
                value={input.skills}
                onChange={handleInputChange}
                placeholder="React, Node, MongoDB"
                className="editprofilemodal__input"
              />
            </div>

            <div>
              <label className="editprofilemodal__label">Resume</label>
              <input type="file" onChange={filechangeHandler} className="editprofilemodal__input" />
            </div>
          </div>

          <div className="editprofilemodal__mt5">
            <label className="editprofilemodal__label">Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={profilePicHandler}
              className="editprofilemodal__input"
            />
          </div>

          <div className="editprofilemodal__mt6">
            {loading ? (
                                loading
            ) : (
              <button type="submit" className="editprofilemodal__btn">
                Save Changes
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Editprofilemodal;

