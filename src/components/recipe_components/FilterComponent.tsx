import React, { useEffect, useState } from "react";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import { useNavigate } from "react-router-dom";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import "../../styling/CardsStyle.css";

const FilterComponent = () => {
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [searchIngredients, setSearchIngredients] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { setOneRecipe, fetchAllRecipes, recipeList } = globalRecipeFunctions();

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllRecipes();
  }, []);

  useEffect(() => {
    if (searchIngredients.length === 0) {
      setFilteredRecipes(recipeList);
    } else {
      const filtered = recipeList.filter((recipe) =>
        searchIngredients.every((ingredient) =>
          recipe.ingredients.some(
            (recipeIngredient) =>
              recipeIngredient.name.toLowerCase() === ingredient.toLowerCase()
          )
        )
      );

      setFilteredRecipes(filtered);
    }
  }, [searchIngredients, recipeList]);

  useEffect(() => {
    if (userInput.length > 0) {
      const normalizedInput = userInput.toLowerCase();
      const matchingSuggestions = Array.from(
        new Set(
          recipeList
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
  }, [userInput, recipeList]);

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
    <>
      <section className="standard-container">
        <div>
          {searchIngredients.length > 0 && (
            <div>
              <p className="centered-container">
                <strong>Selected Ingredients</strong>
              </p>
              {searchIngredients.map((ingredient, index) => (
                <span key={index}>
                  {ingredient}
                  <div className="button-container">
                    <button
                      className="main-button"
                      onClick={() => removeIngredient(ingredient)}
                    >
                      Remove
                    </button>
                  </div>
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
        <ul className="filter-suggestions">
          {suggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      </section>
      <section className="standard-container">
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
    </>
  );
};

export default FilterComponent;
