import "./Header.css";
import Logo from "/src/assets/Logo.svg";
import { NavLink } from "react-router-dom";

function Header() {
  const navLinkStyles = ({ isActive }) => ({
    color: isActive ? "#007bff" : "#333",
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? "bold" : "normal",
  });

  return (
    <header className="header">
      <div className="header-wrapper">
        <img src={Logo} alt="Little Lemon Logo" />
        <nav>
          <ul>
            <li>
              <NavLink style={navLinkStyles} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink style={navLinkStyles} to="/about">
                About
              </NavLink>
            </li>
            <li>
              <NavLink style={navLinkStyles} to="/menu">
                Menu
              </NavLink>
            </li>
            {/* <li>
              <NavLink style={navLinkStyles} to="/reservations">Reservations</NavLink>
            </li>
            <li>
              <NavLink style={navLinkStyles} to="/order">Order Online</NavLink>
            </li>
            <li>
              <NavLink style={navLinkStyles} to="/login">Log In</NavLink>
            </li>
            <li>
              <NavLink style={navLinkStyles} to="/cart">Cart</NavLink>
            </li> */}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
