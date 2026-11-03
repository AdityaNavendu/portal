import "../../styles/navbar.css";

import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users2, LogOut } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_URL } from "../../utils/data.js";
import { useAppContext } from "@/context/AppContext";

const Navbar = () => {
  const { user, setUser } = useAppContext();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const navigate =useNavigate();
const logouthandler = async () => {
  try {
    const res = await axios.get(`${USER_API_URL}/logout`, {
      withCredentials: true,
    });
    if (res.data.success) {
      setUser(null);
      navigate("/login");
      toast.success(res.data.message);
    
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || "Failed to logout");
  }
}
  useEffect(() => {
    const onDocClick = (e) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <header className="navbar__root">
      <div className="navbar__inner">
        <div className="navbar__brand" onClick={() => navigate("/")}>
          job <span className="navbar__brandAccent">portal</span>
        </div>

        <div className="navbar__right">
          <ul className="navbar__navList">
            {user && user.role==="recruiter"? (
              <>
               <li>
              <Link className="navbar__navLink" to="/admin/companies">
            companies
              </Link>
            </li>
            <li>
              <Link className="navbar__navLink" to="/admin/jobs">
                jobs
              </Link>
            </li>
            </>
            ):(
              <>
                 <li>
              <Link className="navbar__navLink" to="/home">
                home
              </Link>
            </li>
            <li>
              <Link className="navbar__navLink" to="/browse">
                browse
              </Link>
            </li>
            <li>
              <Link className="navbar__navLink" to="/jobs">
                jobs
              </Link>
            </li></>
            )}
         
          </ul>

          {user ? (
            <div className="navbar__profileWrap" ref={rootRef}>
              <button
                type="button"
                className="navbar__avatarButton"
                aria-haspopup="true"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <img
                  className="navbar__avatarImage"
                  src={user.profile?.profilepicture || "https://github.com/shadcn.png"}
                  alt="user avatar"
                />
              </button>

              {open && (
                <div className="navbar__popover">
                  <div className="navbar__popoverHeader">
                    <img
                      className="navbar__avatarImage navbar__avatarImage--small"
                      src={user.profile?.profilepicture || "https://github.com/shadcn.png"}
                      alt="user avatar"
                    />

                    <div>
                      <h3 className="navbar__userName">{user.fullname}</h3>
                      <p className="navbar__mutedText">
                        {user.profile?.bio || "No bio provided"}
                      </p>
                    </div>
                  </div>

                  <div className="navbar__popoverActions">
                 {user && user.role==="applicant" && (
                     <Link
                      to="/profile"
                      className="navbar__popoverLine"
                    >
                      <Users2 size={18} />
                      <span>Profile</span>
                    </Link>
                 )}

                    <button type="button" onClick={logouthandler} className="navbar__popoverLine">
                      <LogOut size={18} />
                      <span>log out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__authActions">
              <Link to="/login" className="navbar__navButton navbar__navButton--login">
                Login
              </Link>
              <Link to="/register" className="navbar__navButton navbar__navButton--register">
                register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

