import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const DisplayRecipes = () => {
  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        setRecipe(response.data);
        console.log("Success fetching data from Swagger/Recipes");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Display Recipes</h1>
      <ul>
        {recipeData.map((recipe) => (
          <li key={recipe._id}>
            <Link to={`/recipe/${recipe._id}`}>
              <div>
                <img src={recipe.imageUrl} alt={recipe.title} />
                <h2>{recipe.title}</h2>
                <p>{recipe.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayRecipes;