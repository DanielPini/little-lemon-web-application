import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contents-wrapper">
        <div className="lemon-logo"></div>
        <div className="footer-links">
          <div className="doormat-navigation">
            <h4>Doormat navigation</h4>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="">Menu</Link>
            <Link to="">Reservations</Link>
            <Link to="">Order Online</Link>
            <Link to="">Login</Link>
          </div>
          <div className="contact">
            <h4>Contact</h4>
            <p>Address</p>
            <p>Phone number</p>
            <p>Email</p>
          </div>
          <div className="social-links">
            <h4>Social Media Links</h4>
            <a href="https://instagram.com">Instagram</a>
            <a href="https://facebook.com">Facebook</a>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://myspace.com">MySpace</a>
            <a href="https://mastadon.com">Mastadon</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
