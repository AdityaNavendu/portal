


import { Search } from "lucide-react";
import { GiPostOffice } from "react-icons/gi";
import { useState , useEffect} from "react";
import "../../styles/header.css";
import { useDispatch } from "react-redux";
import { setSearchquery } from "@/redux/jobslice";
import { useNavigate} from "react-router-dom";


const Header = () => {
    const [query, setquery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // use useeffect to update the searchquery in redux
    useEffect(() => {
        dispatch(setSearchquery(query));
    }, [query, dispatch]);

    const searchJobhandler = () => {
        console.log("searchJobhandler");
        console.log(query);
        dispatch(setSearchquery(query));
        navigate("/browse");

    };

  return (
    <div className="header__outer">
      <div>
        <div className="header__hero">
          <div className="header__tagRow">
            <div className="header__tag">
              <GiPostOffice className="header__tagIcon" />
              <span>No 1 job hunter for graduates</span>
            </div>
          </div>

          <h2 className="header__title">
            Search, Apply & <br />
            Get Your <span className="header__titleAccent">Dream Job</span>
          </h2>

          <p className="header__desc">
            Start your hunt for a dream life through career opportunities
            <br />
            that will shape your future and unlock your true potential.
            All the best!
          </p>

          <div className="header__searchRow">
            <div className="header__searchBar">
              <input onChange={(e)=> setquery(e.target.value)}
                placeholder="Search jobs"
                className="header__searchInput"
              />

              <button className="header__searchBtn" onClick={searchJobhandler}>
                <Search className="header__searchIcon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

