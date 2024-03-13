import React from "react";
import RecipeSearch from "../components/SearchRecipe";
import UploadRecipe from "../components/UploadRecipe";
import CategorySuggestion from "../components/CategorySuggestion"
import CategorySearch from "../components/CategorySearch";

const Homepage = () => {
  return (
    <div>
        <CategorySearch/>
      <h1>Welcome to the Home- Page</h1>
      <div className="card">
        <h3>This is the search component:</h3>
        <RecipeSearch />
        <h3>Här har vi lite kategorier </h3>
        <CategorySuggestion/>

        <h3>Here you can add a recipe</h3>
        <UploadRecipe />
      </div>
    </div>
  );
};

export default Homepage;
