import "../styling/NavbarStyle.css";
import { To, useNavigate } from "react-router-dom";
import globalCartFunctions from "../state/Cart"

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
        <a onClick={() => handleNavigation("/CategoryPage")}>Categories</a>
        <a onClick={() => handleNavigation("/Filter")}>Filter</a>
        <a onClick={() => handleNavigation("/Recipes")}>Recipes</a>
        <a onClick={() => handleNavigation("/AdminPage")}>Admin</a>
        <button className="main-btn" onClick={() => toggleCart(displayCart)}>Cart</button>
      </div>
    </div>
  );
};

export default Navbar;
