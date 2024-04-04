//Malcolm

import axios from "axios";
import { useState } from "react";
import allRecipeState from "../../store/Endpoints";

const UpdateRecipe = () => {
  // Define the base URL for API requests
  const URL = "https://sti-java-grupp4-s4yjx9.reky.se";

  // Define state variables for recipe details and ingredients
  const [recipeId, setRecipeId] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [recipeDescription, setRecipeDescription] = useState("");
  const [recipeRating, setRecipeRating] = useState(Number);
  const [recipeImageUrl, setRecipeImageUrl] = useState("");
  const [recipeTimeInMin, setRecipeTimeInMin] = useState(Number);
  const [recipeCategory, setRecipeCategory] = useState("");
  const [recipeIntructions, setRecipeInstructions] = useState("");
  const [ingredientName, setIngrediantName] = useState("");
  const [ingredientAmount, setIngrediantAmount] = useState(Number);
  const [ingredientUnit, setIngrediantUnit] = useState("");
  const { recipeList } = allRecipeState();
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Function to fetch recipe details by its ID from the server
  const getRecipeById = async (recipeId: string) => {
    try {
      const response = await axios.get(`${URL}/recipes/${recipeId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching recipe:", error);
      return null;
    }
  };

  // Function to update recipe details by its ID on the server
  const updateById = async () => {
    try {
      // Prepare updated recipe data
      const updatedRecipeData = {
        title: recipeName,
        description: recipeDescription,
        ratings: recipeRating,
        imageUrl: recipeImageUrl,
        timeInMins: recipeTimeInMin,
        categories: recipeCategory,
        instructions: recipeIntructions,
      };

      // Send patch request to update recipe
      const response = await axios.patch(
        `${URL}/recipes/${recipeId}`,
        updatedRecipeData
      );

      // If update is successful, retrieve and alert updated recipe
      if (response.status === 200) {
        const updatedRecipe = await getRecipeById(recipeId);
        if (updatedRecipe) {
          alert("Updated");
        }
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  const handleInputChange = (value: string) => {
    setSearchTerms(value);
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      generateSuggestions(value);
    }
  };

  const generateSuggestions = (value: string) => {
    const filteredSuggestions = recipeList
      .filter((recipe) =>
        recipe.title.toLowerCase().includes(value.toLowerCase())
      )
      .map((recipe) => recipe.title);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value: string) => {
    setSearchTerms(value);
    setSuggestions([]);
    const selectedRecipe = recipeList.find(
      (recipe) => recipe.title.toLowerCase() === value.toLowerCase()
    );
    if (selectedRecipe) {
      // Fill in the form with information from the selected recipe.
      setRecipeId(selectedRecipe._id || "");
      setRecipeName(selectedRecipe.title);
      setRecipeDescription(selectedRecipe.description);
      setRecipeRating(
        Array.isArray(selectedRecipe.ratings)
          ? selectedRecipe.ratings[0]
          : selectedRecipe.ratings || 0
      );
      setRecipeImageUrl(selectedRecipe.imageUrl);
      setRecipeTimeInMin(selectedRecipe.timeInMins || 0);
      setRecipeCategory(
        Array.isArray(selectedRecipe.categories)
          ? selectedRecipe.categories[0]
          : selectedRecipe.categories || 0
      );
      setRecipeInstructions(
        Array.isArray(selectedRecipe.instructions)
          ? selectedRecipe.instructions[0]
          : selectedRecipe.instructions || 0
      );

      // Update the state for ingredients if needed.
      if (selectedRecipe.ingredients.length > 0) {
        const firstIngredient = selectedRecipe.ingredients[0];
        setIngrediantName(firstIngredient.name);
        setIngrediantAmount(firstIngredient.amount);
        setIngrediantUnit(firstIngredient.unit);
      }
    } else {
      console.log("Error");
    }
  };

  const handleClearSearch = () => {
    setSearchTerms("");
    setSuggestions([]);
  };

  const presentIngredientsUnit = [
    "kg","hg","g","l","dl","ml","msk","tsk","krm","st",
  ];

  // Return the UI for updating a recipe
  return (
    <>
      <div className="update-container">
        <h2>Update recipe</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchTerms}
            placeholder="Search recipe..."
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button onClick={handleClearSearch}>Clear</button>

          {searchTerms.trim() !== "" && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </div>
        <br />
        <br />
        <form
          className="update-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateById();
          }}
        >
          <label className="update-label">
            Id:
            <input
              type="text"
              value={recipeId}
              onChange={(input) => setRecipeId(input.target.value)}
              placeholder="Recipe ID here"
            />
          </label>
          <br />
          <label className="update-label">
            Title:
            <input
              type="text"
              name="title"
              value={recipeName}
              onChange={(input) => {
                const filteredValue = input.target.value.replace(
                  /[^a-zA-Z\s]/g,
                  ""
                );
                setRecipeName(
                  filteredValue.charAt(0).toUpperCase() +
                    filteredValue.slice(1).toLowerCase()
                );
              }}
            />
          </label>
          <br />
          <label className="update-label">
            Description:
            <input
              type="text"
              name="description"
              value={recipeDescription}
              onChange={(input) => setRecipeDescription(input.target.value)}
            />
          </label>
          <br />
          <label className="update-label">
            Grade:
            <input
              type="number"
              name="description"
              value={recipeRating}
              onChange={(input) => setRecipeRating(input.target.valueAsNumber)}
            />
          </label>
          <br />
          <label className="update-label">
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={recipeImageUrl}
              onChange={(input) => setRecipeImageUrl(input.target.value)}
            />
          </label>
          <br />
          <label className="update-label">
            Time in min:
            <input
              type="number"
              name="timeInMins"
              value={recipeTimeInMin}
              onChange={(input) =>
                setRecipeTimeInMin(input.target.valueAsNumber)
              }
            />
          </label>
          <br />
          <label className="update-label">
            Category:
            <input
              type="text"
              name="categories"
              value={recipeCategory}
              onChange={(input) => setRecipeCategory(input.target.value)}
            />
          </label>
          <br />
          <label className="update-label">
            Instructions:
            <input
              type="text"
              name="instructions"
              value={recipeIntructions}
              onChange={(input) => setRecipeInstructions(input.target.value)}
            />
          </label>

          <br />
          <h2>Update ingredients</h2>
          <label className="update-label">
            Ingredient namn:
            <input
              type="text"
              name="ingredientName"
              value={ingredientName}
              onChange={(input) => setIngrediantName(input.target.value)}
            />
          </label>
          <label className="update-label">
            Amount:
            <input
              type="number"
              name="amount"
              value={ingredientAmount}
              onChange={(input) =>
                setIngrediantAmount(input.target.valueAsNumber)
              }
            />
          </label>
          <label className="update-label">
            Unit:
            <select
              value={ingredientUnit}
              onChange={(input) => setIngrediantUnit(input.target.value)}
            >
              {presentIngredientsUnit.map((unit, index) => (
              <option key={index} value={unit}>
                {unit}
              </option>
            ))}
            </select>
          </label>
          <br />
          <button className="upload-button" type="submit">
            Send update
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateRecipe;
