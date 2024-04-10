import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import { useNavigate } from "react-router-dom";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import "../../styling/CardsStyle.css";

const FilterComponent = () => {
  const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { setOneRecipe } = globalRecipeFunctions();

  const navigate = useNavigate();

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
        searchIngredients.every((ingredient) =>
          recipe.ingredients.some(
            (recipeIngredient) =>
              recipeIngredient.name.toLowerCase() === ingredient.toLowerCase()
          )
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

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="standard-container">
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
      <div className="spacer-container">
        <input
          className="user-input"
          type="text"
          placeholder="Search ingredient"
          value={userInput}
          onChange={handleInputChange}
        />
      </div>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            {suggestion}
          </li>
        ))}
      </ul>
      <div className="card-grid">
        {filteredRecipes.map((recipe) => (
          <div
            className="recipe-card"
            key={recipe._id}
            onClick={() => handleNavigate(recipe)}
          >
            <div className="first-card-div">
              <img
                className="display-recipe-img"
                src={recipe.imageUrl}
                alt={recipe.title}
              />
              <b className="card-category">{recipe.categories[0]}</b>
            </div>
            <div className="second-card-div">
              <h3>{recipe.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FilterComponent;
