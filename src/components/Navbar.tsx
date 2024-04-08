import "../styling/NavbarStyle.css";
import { To, useNavigate } from "react-router-dom";
import globalCartFunctions from "../store/GlobalCart"
import uploadUpdateRecipeState from "../store/GlobalUpdateAndUpload";
import ShoppingList from '../assets/Shoppinglist.svg'

const Navbar = () => {
  const navigate = useNavigate();
  const { emptyRecipe } = uploadUpdateRecipeState();

  const handleNavigation = (path: To) => {
    navigate(path);
    emptyRecipe();
  };

  const { displayCart, toggleCart } = globalCartFunctions();

  return (
    <div className="navbar container">
      <a className="logo" onClick={() => handleNavigation("/")}>
        Logo
      </a>
      <div className="nav-links">
        <a onClick={() => handleNavigation("/")}>Home</a>
        <a onClick={() => handleNavigation("/cocktails")}>Cocktails</a>
        <a onClick={() => handleNavigation("/filter")}>Filter</a>
        <a onClick={() => handleNavigation("/recipes")}>Recipes</a>
        <a onClick={() => handleNavigation("/adminpage")}>Admin</a>
        <a onClick={() => handleNavigation("/popular")}>Popular</a>
        <a onClick={() => toggleCart(displayCart)} className="list-container"><img src={ShoppingList} alt="Shopping list" /></a>
      </div>
    </div>
  );
};

export default Navbar;