import { useState } from "react";
import "./Header.css";
import Logo from "/src/assets/Logo.svg";
import Burger from "/src/assets/hamburger-menu.svg";
import { NavLink } from "react-router-dom";

function Header() {
  const navLinkStyles = ({ isActive }) => ({
    color: isActive ? "#007bff" : "#333",
    textDecoration: isActive ? "underline" : "none",
    fontWeight: isActive ? "bold" : "normal",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    console.log("clicked");
  };

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="logo-wrapper">
          <img src={Logo} alt="Little Lemon Logo" className="logo" />
        </div>
        <nav>
          <div className="burger-button" onClick={handleClick} role="button">
            <img src={Burger} alt="" />
          </div>
          <ul className={isOpen ? "isOpen" : ""}>
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
            <li>
              <NavLink style={navLinkStyles} to="/reservations">
                Reservations
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
