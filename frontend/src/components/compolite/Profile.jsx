import Navbar from "./Navbar";
import "../../styles/profile.css";
import { Mail, Contact, Pen } from "lucide-react";
import AppliedJob from "./AppliedJob";
import EditProfilemodal from "./Editprofilemodal";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";





const Profile = () => {
  
  const [open, setOpen] = useState(false);

  const { user } = useAppContext();
  console.log(user);

  if (!user) return null;

  const skills = user?.profile?.skills || [];
  console.log(skills);
  const resumeFile = user?.profile?.resume;
  console.log(resumeFile);
  const profilePic = user?.profile?.profilepicture;


  return (
      <div className="profile__page">
      <Navbar />

      <div className="profile__container">

        <div className="profile__card">
          <div className="profile__topRow">

            <div className="profile__left">
              <div className="profile__avatarWrap">
                <img
                  className="profile__avatarImg"
                  src={profilePic || "https://github.com/shadcn.png"}
                  alt="Profile"
                />
              </div>

              <div>
                <h1 className="profile__title">
                  {user?.fullname || user?.name || "User"}
                </h1>

                <p className="profile__bio">
                  {user?.profile?.bio || "No bio added"}
                </p>
                
              </div>
            </div>


            <button
              type="button"
              className="profile__editBtn"
              onClick={() => setOpen(true)}
              aria-label="Edit profile"
            >
              <Pen className="profile__editIcon" />
            </button>
          </div>


          <div className="profile__contact">
            <div className="profile__contactRow">
              <Mail className="profile__contactIcon" />
              <a href={`mailto:${user?.email}`} className="profile__contactText">{user?.email}</a>
            </div>

            <div className="profile__contactRow">
              <Contact className="profile__contactIcon" />
              <span className="profile__contactText">
                {user?.phoneNumber || user?.phone || "Not Added"}
              </span>
            </div>
          </div>


          <div className="profile__section">
            <h2 className="profile__sectionTitle">
              Skills
            </h2>

            <div className="profile__skills">
              {skills.length > 0 ? (
                skills.map((skills, index) => (
                  <span key={index} className="profile__skillBadge">
                    {skills}
                  </span>
                ))
              ) : (
                <p className="profile__muted">No skills added</p>
              )}
            </div>
          </div>


          <div className="profile__section">
            <h2 className="profile__sectionTitle">
        {user?.profile?.resumeoriginalname || "Resume"}
            </h2>

            {resumeFile ? (
              <a
                href={resumeFile}
                target="_blank"
                rel="noopener noreferrer"
                className="profile__resumeLink"
              >
                {user.profile.resume}
              </a>
            ) : (
              <p className="profile__muted">No resume uploaded</p>
            )}
          </div>
        </div>


        <div className="profile__jobsSection">
          <h1 className="profile__jobsTitle2">
            Applied Jobs
          </h1>

          <div className="profile__jobsOverflow">
            <AppliedJob />
          </div>
        </div>
      </div>

      <EditProfilemodal
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default Profile;