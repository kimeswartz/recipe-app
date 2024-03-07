import React, { useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";


// funktion med type annotation FC (function)
// setRecipe skickar tillbaka vår RecipeInterface eller null.

const RecipeSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipe, setRecipe] = useState<RecipeInterface | null>(null);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    setError(""); // Reset error message
    try {
      const response = await axios.get(
        `https://sti-java-grupp4-s4yjx9.reky.se/recipes?title=${encodeURIComponent(searchTerm)}`
      );
  
      if (response.data.length > 0) {
        // Find the recipe that exactly matches the search term
        const matchingRecipe = response.data.find((recipe: { title: string; }) => recipe.title === searchTerm);
  
        if (matchingRecipe) {
          setRecipe(matchingRecipe);
        } else {
          setRecipe(null);
          setError("No exact match found for the given search term.");
        }
      } else {
        setRecipe(null);
        setError("No recipes found for the given search term.");
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      setError("Failed to fetch recipe. Please try again later.");
    }
  };
  

  return (
    <div>
      <label>
        Search Recipe:
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>

      {error && <p>{error}</p>}

      {recipe ? (
        <div>
          <h2>{recipe.title}</h2>
          {/* ...other recipe details */}
        </div>
      ) : !error ? (
        <p>Please search for a recipe.</p>
      ) : null}
    </div>
  );
};

<<<<<<< HEAD
export default RecipeSearch;
=======
export default RecipeSearch;
>>>>>>> d32348786b9b46f70a540931719b7d303ebdf41a
