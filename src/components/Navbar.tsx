import "../styling/NavbarStyle.css";
import { To, useNavigate } from "react-router-dom";
import globalCartFunctions from "../store/Cart"

const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: To) => {
    navigate(path);
  };

  const { displayCart, toggleCart } = globalCartFunctions();

  return (
    <div className="navbar container">
      <a className="logo" onClick={() => handleNavigation("/")}>
        Logo
      </a>
      <div className="nav-links">
        <a onClick={() => handleNavigation("/")}>Home</a>
        <a onClick={() => handleNavigation("/Cocktails")}>Cocktails</a>
        <a onClick={() => handleNavigation("/Filter")}>Filter</a>
        <a onClick={() => handleNavigation("/Recipes")}>Recipes</a>
        <a onClick={() => handleNavigation("/AdminPage")}>Admin</a>
        <a onClick={() => handleNavigation("/popular")}>Popular</a>
        <button className="main-button" onClick={() => toggleCart(displayCart)}>Shopping list</button>
      </div>
    </div>
  );
};

export default Navbar;