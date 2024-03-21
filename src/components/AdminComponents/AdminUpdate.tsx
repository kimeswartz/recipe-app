//Malcolm

import axios from "axios";
import { useState } from "react";

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
  const [ingrediantName, setIngrediantName] = useState("");
  const [ingrediantAmount, setIngrediantAmount] = useState("");
  const [ingrediantUnit, setIngrediantUnit] = useState("");

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

  // Return the UI for updating a recipe
  return (
    <>
      <div className="update-container">
        <h2>Update Recipe</h2>

        <form
          className="update-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateById();
          }}
        >
          {/* Form fields for updating recipe details */}
          <label className="update-label">
            Id:
            <input
              type="text"
              value={recipeId}
              onChange={(input) => setRecipeId(input.target.value)}
              placeholder="Enter ID to update"
            />
          </label>
          {/* Other input fields for recipe details */}
          <br />
          {/* Button to submit updates */}
          <button className="upload-button" type="submit">
            Submit Updates
          </button>
        </form>
      </div>
    </>
  );
};

export default UpdateRecipe;
