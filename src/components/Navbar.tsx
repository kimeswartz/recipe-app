import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalCartFunctions from "../store/GlobalCart";
import uploadUpdateRecipeState from "../store/GlobalUpdateAndUpload";
import "../styling/TopNavStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import listIcon from "../assets/logo/favicon-32x32.png";

const Navbar = () => {
  const navigate = useNavigate();
  const { emptyRecipe } = uploadUpdateRecipeState();
  const { displayCart, toggleCart } = globalCartFunctions();
  const [isResponsive, setIsResponsive] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    emptyRecipe();
    setIsResponsive(false); // Close the responsive menu on navigation
  };

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };

  return (
    <div className={`topnav ${isResponsive ? "responsive" : ""}`}>
      <div className="nav-links">
        <a onClick={() => handleNavigation("/")}>Home</a>
        <a onClick={() => handleNavigation("/cocktails")}>Cocktails</a>
        <a onClick={() => handleNavigation("/filter")}>Filter</a>
        <a onClick={() => handleNavigation("/recipes")}>Recipes</a>
        <a onClick={() => handleNavigation("/popular")}>Popular</a>
        <a className="icon" onClick={toggleResponsive}>
          <FontAwesomeIcon icon={faBars} />
        </a>
        <a onClick={() => toggleCart(displayCart)} className="list-container">
          <img src={listIcon} alt="Your list of recipes" />
        </a>
      </div>
    </div>
  );
};

export default Navbar;