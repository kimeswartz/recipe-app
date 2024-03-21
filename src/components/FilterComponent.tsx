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
  const [noIngredientFound, setNoIngredientFound] = useState<boolean>(false);

  // Fetch recipe data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        setRecipeData(response.data);
        setFilteredRecipes(response.data);
        console.log("Success fetching data from the recipe API");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Filter recipes based on search ingredients
  const filterRecipes = () => {
    const filtered = recipeData.filter(recipe => {
      return searchIngredients.some(searchIngredient =>
        recipe.ingredients.some(ingredient =>
          ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
        )
      );
    });
    setFilteredRecipes(filtered);
  };

  // Generate suggestions based on user input
  const generateSuggestions = () => {
    const matchingSuggestions = recipeData
      .flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.name))
      .filter(ingredient => ingredient.toLowerCase().startsWith(userInput.toLowerCase()));

    setSuggestions(matchingSuggestions);
    setNoIngredientFound(matchingSuggestions.length === 0);
  };

  // Update user input and generate suggestions when input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    generateSuggestions();
  };

  // Add selected suggestion to search ingredients and clear user input and suggestions
  const handleSuggestionClick = (suggestion: string) => {
    setSearchIngredients(prevIngredients => [...prevIngredients, suggestion]);
    setUserInput('');
    setSuggestions([]);
    setNoIngredientFound(false);
  };

  // Remove ingredient from search ingredients
  const removeIngredient = (ingredient: string) => {
    setSearchIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient));
  };

  // Update filtered recipes when search ingredients change
  useEffect(() => {
    filterRecipes();
  }, [searchIngredients]);

  // Show all recipes when there are no search ingredients
  useEffect(() => {
    if (searchIngredients.length === 0) {
      setFilteredRecipes(recipeData);
    }
  }, [searchIngredients, recipeData]);

  // Render UI
  return (
    <div className="filter-component-container">
      <h1>Filter Recipes</h1>
      <div>
        {/* Display selected search ingredients */}
        {searchIngredients.map((ingredient, index) => (
          <span key={index}>
            {ingredient}
            <button onClick={() => removeIngredient(ingredient)}>X</button>
          </span>
        ))}
      </div>
      {/* Input field for user to enter search criteria */}
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
      />
      {/* Display suggestions based on user input */}
      <ul>
        {noIngredientFound ? <li>No ingredient found</li> :
          suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
          ))
        }
      </ul>
      {/* Button to filter recipes based on search ingredients */}
      <button onClick={filterRecipes}>Filter</button>
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
            <p>{`Time: ${recipe.timeInMins} mins`}</p>
            <p>{`Categories: ${recipe.categories.join(", ")}`}</p>
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