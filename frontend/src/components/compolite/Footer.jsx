


import { Link } from "react-router-dom";
import { FaSquareXTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa6";

import "../../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__title">
              job <span>portal</span>
            </div>
            <p className="footer__desc">
              Find your dream job faster with curated listings and a smooth application experience.
            </p>
            <div className="footer__socialRow">
              <a
                href="#"
                aria-label="Twitter"
                className="footer__socialLink"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="footer__socialLink"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="footer__socialLink"
              >
                <FaGithub />
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Quick Links</h3>
            <ul className="footer__list">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#">Browse Jobs</a>
              </li>
              <li>
                <a href="#">Latest Jobs</a>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__heading">Contact</h3>
            <div className="footer__list" style={{ gap: "0.75rem" }}>
              <p>
                <span style={{ fontWeight: 600, color: "#111827" }}>Email:</span> hello@jobportal.com
              </p>
              <p>
                <span style={{ fontWeight: 600, color: "#111827" }}>Location:</span> India
              </p>
              <p>
                <span style={{ fontWeight: 600, color: "#111827" }}>Support:</span> Mon–Fri, 9am–5pm
              </p>
            </div>
          </div>
        </div>

        <div className="footer__finePrintRow">
          <div className="footer__finePrintInner">
            <p className="footer__copyright">
              © {new Date().getFullYear()} job portal. All rights reserved.
            </p>
            <div className="footer__links">
              <Link to="/privacy-policy">Privacy Policy</Link>
              <Link to="/terms-of-services">Terms of Service</Link>
              <a href="#">Help</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


