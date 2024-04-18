//Bilge

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import globalCartFunctions from "../store/GlobalCart";
import uploadUpdateRecipeState from "../store/GlobalUpdateAndUpload";
import "../styling/TopNavStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const { emptyRecipe } = uploadUpdateRecipeState();
  const { cartRecipes, cartCocktails } =
    globalCartFunctions();
  const [isResponsive, setIsResponsive] = useState(false);

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0,0)
    emptyRecipe();
    setIsResponsive(false); // Close the responsive menu on navigation
  };

  const toggleResponsive = () => {
    setIsResponsive(!isResponsive);
  };
  const totalItemsInCart =
    cartRecipes.reduce((total, recipe) => total + recipe.quantity, 0) +
    cartCocktails.reduce((total, cocktail) => total + cocktail.quantity, 0);

  return (
    <section className="standard-container sticky">
      <div className={`topnav ${isResponsive ? "responsive" : ""}`}>
        <div className="nav-links">
          <a className="icon" onClick={toggleResponsive}>
            <FontAwesomeIcon icon={faBars} />
          </a>
          <a onClick={() => handleNavigation("/")}>Home</a>
          <a onClick={() => handleNavigation("/cocktails")}>Cocktails</a>
          <a
            id="headerNavigateFilter"
            onClick={() => handleNavigation("/filter")}
          >
            Filter
          </a>
          <a onClick={() => handleNavigation("/recipes")}>Recipes</a>
          <a onClick={() => handleNavigation("/your-list")}>📋 <strong> Your List</strong></a>
          {totalItemsInCart > 0 && (
            <span className="item-count">{totalItemsInCart}</span>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;