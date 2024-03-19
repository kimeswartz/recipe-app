import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const FilterComponent = () => {
  const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

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

  const filterRecipes = () => {
    const filtered = recipeData.filter(recipe => {
      // Check if all searchIngredients are present in recipe
      return searchIngredients.every(searchIngredient =>
        recipe.ingredients.some(ingredient =>
          ingredient.name.toLowerCase().includes(searchIngredient.toLowerCase())
        )
      );
    });
    setFilteredRecipes(filtered);
  };

  const generateSuggestions = () => {
    const ingredients = recipeData.reduce((acc, recipe) => {
      recipe.ingredients.forEach(ingredient => {
        if (!acc.includes(ingredient.name)) {
          acc.push(ingredient.name);
        }
      });
      return acc;
    }, []);

    const matchingSuggestions = ingredients.filter(ingredient =>
      ingredient.toLowerCase().includes(userInput.toLowerCase())
    );
    setSuggestions(matchingSuggestions);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    generateSuggestions();
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchIngredients(prevIngredients => [...prevIngredients, suggestion]);
    setUserInput('');
    setSuggestions([]);
  };

  return (
    <div>
      <h1>Filter Recipes</h1>
      <div>
        {searchIngredients.map((ingredient, index) => (
          <span key={index}>
            {ingredient}
            <button onClick={() => setSearchIngredients(prevIngredients => prevIngredients.filter(item => item !== ingredient))}>X</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>{suggestion}</li>
        ))}
      </ul>
      <button onClick={filterRecipes}>Filter</button>
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
              ))}
            </ul>
            <p>{`Time: ${recipe.timeInMins} mins`}</p>
            <p>{`Categories: ${recipe.categories.join(", ")}`}</p>
            <ul>
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