import React from "react";
import "../styling/HeaderComponentStyle.css"

const HeaderRecipes: React.FC = () => {
  return (
    <header className="home-header">
      <div className="header-content">
        <h1 className="header-title">Explore Our Rich Recipe Collection</h1>
        <p className="header-paragraph">
          On this page you will find all our recipes! Choose a category or
          browse through all the recipes!
        </p>
        <div className="margin-container"></div>
      </div>
    </header>
  );
};

export default HeaderRecipes;
