//Bilge

import { useEffect, useState } from "react";
import globalRecipeFunctions from "../../store/recipes_store/RecipeAPICalls";
import { RecipeInterface } from "../../interfaces/recipe_interfaces/RecipeInterface";
import { useNavigate } from "react-router-dom";
import "../../styling/CardsStyle.css";

const SearchRecipe = () => {
  const { recipeList, setOneRecipe, fetchAllRecipes } = globalRecipeFunctions();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(recipeList.length === 0){
      fetchAllRecipes();
    }
  }, [])

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
  };

  const performSearch = () => {
    if (searchTerms.trim() !== "") {
      setSearchPerformed(true);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerms(value);
    if (value.trim() === "") {
      setSuggestions([]);
      setSearchPerformed(false);
    } else {
      generateSuggestions(value);
    }
  };

  const generateSuggestions = (value: string) => {
    const filteredSuggestions = recipeList
      .filter(
        (recipe) =>
          recipe.title &&
          recipe.title.toLowerCase().includes(value.toLowerCase())
      )
      .map((recipe) => recipe.title);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchTerms(value);
    setSuggestions([]);
    performSearch(); // Perform search when suggestion is selected
    // Navigate to the recipe page
    const selectedRecipe = recipeList.find(
      (recipe) => recipe.title.toLowerCase() === value.toLowerCase()
    );
    if (selectedRecipe) {
      handleNavigate(selectedRecipe);
    }
  };

  const handleClearSearch = () => {
    setSearchTerms("");
    setSearchPerformed(false);
    setSuggestions([]);
  };

  const filteredRecipes = recipeList.filter((recipe) =>
    searchTerms
      .split(" ")
      .every(
        (term) =>
          recipe.title &&
          recipe.title?.toLowerCase().includes(term.toLowerCase())
      )
  );

  return (
    <>
      <div className="maximum-width-container">
        <div className="flex-horizontally-container">
          <div className="form-input" style={{ position: "relative" }}>
            <input
              className="user-input"
              type="text"
              value={searchTerms}
              placeholder="Search recipes..."
              onChange={(e) => handleInputChange(e.target.value)}
            />
            <button className="main-button" onClick={handleClearSearch}>
              Clear
            </button>
            {searchTerms.trim() !== "" && (
              <div className="suggestions">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <b>{suggestion}</b>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {searchPerformed && searchTerms.trim() !== "" && (
          <div>
            {filteredRecipes.map((recipe) => (
              <div
                className="recipe-card"
                key={recipe._id}
                onClick={() => handleNavigate(recipe)}
              ></div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default SearchRecipe;
