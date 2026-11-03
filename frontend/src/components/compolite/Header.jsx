


import { Search } from "lucide-react";
import { GiPostOffice } from "react-icons/gi";
import { useState } from "react";
import "../../styles/header.css";
import { useNavigate} from "react-router-dom";


const Header = () => {
    const [query, setquery] = useState("");
    const navigate = useNavigate();

    const searchJobhandler = () => {
        const keyword = query.trim();
        navigate(keyword ? `/browse?keyword=${encodeURIComponent(keyword)}` : "/browse");
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
            <form className="header__searchBar" onSubmit={(event) => {
              event.preventDefault();
              searchJobhandler();
            }}>
              <input
                value={query}
                onChange={(e)=> setquery(e.target.value)}
                placeholder="Search jobs"
                className="header__searchInput"
              />

              <button type="submit" className="header__searchBtn">
                <Search className="header__searchIcon" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
