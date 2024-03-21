import React, { useEffect, useState } from "react";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import axios from "axios";
import "../styling/RecipiesByCategoryStyle.css"

const TopRatedRecipes = () => {
  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        if (response.status === 200) {
          setRecipe(response.data);
          console.log("Success fetching data from Swagger/Recipes");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRecipes();
  }, []);

  const filteredRecipes = recipeData.filter((recipe) => recipe.avgRating >= 3);

  return (
    <div className="recipeContainer">
      <h2>Top Rated Recipes</h2>
      <div className="recipeList">
        {filteredRecipes
          .sort((a, b) => b.avgRating - a.avgRating)
          .map((recipe) => {
            return (
              <div key={recipe._id} className="recipeItem">
                <div className="imgContainer">
                  <img src={recipe.imageUrl} alt={recipe.title} />
                </div>
                <div className="textContainer">
                  <h2>
                    {recipe.title}, {recipe.avgRating}
                  </h2>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopRatedRecipes;
