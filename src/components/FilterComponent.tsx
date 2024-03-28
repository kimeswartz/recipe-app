import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";
import "../styling/Filter.css";

const FilterComponent = () => {
  // State variables to store recipe data, filtered recipes, user input, search ingredients, and suggestions
  const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Fetch recipe data from the API when the component mounts
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

  // Function to normalize ingredient names
  const normalizeIngredientName = (name: string) => {
    return name.toLowerCase(); // Convert ingredient name to lowercase
  };

  // Filter recipes based on search ingredients
  useEffect(() => {
    if (searchIngredients.length === 0) {
      setFilteredRecipes(recipeData);
    } else {
      const filtered = recipeData.filter(recipe => {
        const normalizedIngredients = recipe.ingredients.map(ingredient => normalizeIngredientName(ingredient.name));
        return searchIngredients.every(searchIngredient => normalizedIngredients.includes(normalizeIngredientName(searchIngredient)));
      });
      setFilteredRecipes(filtered);
    }
  }, [searchIngredients, recipeData]);

  // Generate suggestions based on user input
  useEffect(() => {
    if (userInput.length > 0) {
      const normalizedInput = userInput.toLowerCase(); // Normalizing user input
      const matchingSuggestions = Array.from(new Set(
        recipeData
          .flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.name.toLowerCase())) // Normalizing ingredient names
          .filter(ingredient => ingredient.startsWith(normalizedInput))
      ));

      setSuggestions(matchingSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [userInput, recipeData]);

  // Update user input when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Add selected suggestion to search ingredients
  const handleSuggestionClick = (suggestion: string) => {
    setSearchIngredients(prevIngredients => [...prevIngredients, suggestion]);
    setUserInput('');
    setSuggestions([]);
  };

  // Remove ingredient from search ingredients
  const removeIngredient = (ingredient: string) => {
    setSearchIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient));
  };

  // Render UI
  return (
    <div className="filter-component-container">
      <h1>Filtera Recept</h1>
      <div>
        {/* Display selected search ingredients */}
        {searchIngredients.length > 0 && (
          <div>
            <h2>Valda Ingredienser:</h2>
            {searchIngredients.map((ingredient, index) => (
              <span key={index}>
                {ingredient}
                <button onClick={() => removeIngredient(ingredient)}>X</button>
              </span>
            ))}
          </div>
        )}
        {/* Display message if no ingredient is found */}
        {searchIngredients.length > 0 && filteredRecipes.length === 0 && (
          <p>Inga recept hittades som matchar de valda ingredienserna.</p>
        )}
      </div>
      {/* Input field for user to enter search criteria */}
      <input
        type="text"
        placeholder="Sök ingrediens"
        value={userInput}
        onChange={handleInputChange}
      />
      {/* Display suggestions based on user input */}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
        ))}
      </ul>
      {/* Display filtered recipes */}
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <ul>
              {/* Display ingredients of each recipe */}
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
              ))}
            </ul>
            <p>{`Tid: ${recipe.timeInMins} minuter`}</p>
            <p>{`Kategorier: ${recipe.categories.join(", ")}`}</p>
            <ul>
              {/* Display instructions of each recipe */}
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterComponent;