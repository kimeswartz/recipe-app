import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";

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
    const ingredients: string[] = recipeData.reduce((acc, recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (!acc.includes(ingredient.name)) {
          acc.push(ingredient.name);
        }
      });
      return acc;
    }, []);

    const matchingSuggestions = ingredients.filter((ingredient) =>
      typeof ingredient === 'string' && ingredient.toLowerCase().includes(userInput.toLowerCase())
    );
    setSuggestions(matchingSuggestions);
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
    <div>
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
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
        ))}
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