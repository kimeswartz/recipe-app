import "../styling/NavbarStyle.css";
import { To, useNavigate } from "react-router-dom";
import globalCartFunctions from "../state/Cart"
import svStrings from "../interfaces/LanguageSv";
import enStrings from "../interfaces/LanguageEn";
import { useState } from "react";


const Navbar = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const strings = currentLanguage === 'sv' ? svStrings : enStrings;
  const { displayCart, toggleCart } = globalCartFunctions();


  const handleNavigation = (path: To) => {
    navigate(path);
  };
  
  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'sv' ? 'en' : 'sv');
  };

  return (
    <div className="navbar container">
      <a className="logo" onClick={() => handleNavigation("/")}>
        Logo
      </a>
      <div className="nav-links">
        <a onClick={() => handleNavigation("/")}>{strings.navbar.home}</a>
        <a onClick={() => handleNavigation("/CategoryPage")}>{strings.navbar.categories}</a>
        <a onClick={() => handleNavigation("/Filter")}>{strings.navbar.filter}</a>
        <a onClick={() => handleNavigation("/Recipes")}>{strings.navbar.recipes}</a>
        <a onClick={() => handleNavigation("/AdminPage")}>{strings.navbar.admin}</a>
        <a onClick={() => handleNavigation("/popular")}>{strings.navbar.popular}</a>
        <button className="main-button" onClick={() => toggleCart(displayCart)}>{strings.navbar.cart}</button>
        <button className="lang-button" onClick={toggleLanguage}>
          {currentLanguage === 'sv' ? 'English' : 'Svenska'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
