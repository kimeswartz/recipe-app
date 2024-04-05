import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import "../../styling/FilterComponentStyle.css";

const FilterComponent = () => {
  const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        setRecipeData(response.data);
        console.log("Success fetching data from the recipe API");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchIngredients.length === 0) {
      setFilteredRecipes(recipeData);
    } else {
      const filtered = recipeData.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
          searchIngredients.includes(ingredient.name.toLowerCase())
        )
      );
      setFilteredRecipes(filtered);
    }
  }, [searchIngredients, recipeData]);

  useEffect(() => {
    if (userInput.length > 0) {
      const normalizedInput = userInput.toLowerCase();
      const matchingSuggestions = Array.from(
        new Set(
          recipeData
            .flatMap((recipe) =>
              recipe.ingredients.map((ingredient) =>
                ingredient.name.toLowerCase()
              )
            )
            .filter((ingredient) => ingredient.startsWith(normalizedInput))
        )
      );
      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [userInput, recipeData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchIngredients((prevIngredients) => [...prevIngredients, suggestion]);
    setUserInput("");
    setSuggestions([]);
  };

  const removeIngredient = (ingredient: string) => {
    setSearchIngredients((prevIngredients) =>
      prevIngredients.filter((item) => item !== ingredient)
    );
  };

  return (
    <div className="filter-component-container">
      <div>
        {searchIngredients.length > 0 && (
          <div>
            <h2>Selected Ingredients:</h2>
            {searchIngredients.map((ingredient, index) => (
              <span key={index}>
                {ingredient}
                <button onClick={() => removeIngredient(ingredient)}>X</button>
              </span>
            ))}
          </div>
        )}
        {searchIngredients.length > 0 && filteredRecipes.length === 0 && (
          <p>No recipes found matching the selected ingredients.</p>
        )}
      </div>
      <input
        type="text"
        placeholder="Search ingredient"
        value={userInput}
        onChange={handleInputChange}
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      <div className="card-grid">
        {filteredRecipes.map((recipe) => (
          <div className="recipe-card" key={recipe._id}>
            <img
              className="recipe-card-img"
              src={recipe.imageUrl}
              alt={recipe.title}
            />
            <div className="recipe-card-content">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                  >{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
                ))}
              </ul>
              <p>{`Time: ${recipe.timeInMins} minutes`}</p>
              <p>{`Categories: ${recipe.categories.join(", ")}`}</p>
              <ul>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
