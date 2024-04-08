import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo/favicon-32x32.png";
import "../styling/NavbarStyle.css";

interface MenuItem {
  title: string;
  path: string;
}

interface NavbarProps {
  menuItems: MenuItem[];
}

const Navbar = ({ menuItems }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
          <p className="logo-text">Food Haven</p>
        </Link>
      </div>
      <div className={`menu-icon ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
        <div className="menu-line" />
        <div className="menu-line" />
        <div className="menu-line" />
      </div>
      <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.path}
              className={item.title === "Your list" ? "main-button" : ""}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
