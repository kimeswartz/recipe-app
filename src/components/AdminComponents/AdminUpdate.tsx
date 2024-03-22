import axios from "axios";
import { useState } from "react";


const UpdateRecipe = () => {
  const URL = "https://sti-java-grupp4-s4yjx9.reky.se";
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

  // Funktion för att hämta receptet från servern med hjälp av dess ID
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

  // Funktionen uppdaterar ett recept i servern med hjälp av dess ID
  const updateById = async () => {
    try {
      const updatedRecipeData = {
        title: recipeName,
        description: recipeDescription,
        ratings: recipeRating,
        imageUrl: recipeImageUrl,
        timeInMins: recipeTimeInMin,
        categories: recipeCategory,
        instructions: recipeIntructions,
      };

      const response = await axios.patch(
        `${URL}/recipes/${recipeId}`,
        updatedRecipeData
      );

      if (response.status === 200) {
        // Hämta den uppdaterade informationen för receptet
        const updatedRecipe = await getRecipeById(recipeId);
        if (updatedRecipe) {
          alert("Updated");
        }
      }
    } catch (error) {
      console.error("Error updating recipe:", error);
    }
  };

  return (
    <>
      <div className="update-container">
        <h2>Update Recipe</h2>

        <form
          className="update-form"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            updateById(); // Call your update function
          }}
        >
          <label className="update-label">
            Id:
            <input
              type="text"
              value={recipeId}
              onChange={(input) => setRecipeId(input.target.value)}
              placeholder="Enter ID to update"
            />
          </label>
          <br />
          <label className="update-label">
            Title:
            <input
              type="text"
              name="title"
              value={recipeName}
              onChange={(input) => setRecipeName(input.target.value)}
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
            Rating:
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
            Time in mins:
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
          <h2>Update Ingredients</h2>
          <label className="update-label">
            Ingredient Name:
            <input
              type="text"
              name="ingredientName"
              value={ingrediantName}
              onChange={(input) => setIngrediantName(input.target.value)}
            />
          </label>
          <label className="update-label">
            Amount:
            <input
              type="number"
              name="amount"
              value={ingrediantAmount}
              onChange={(input) => setIngrediantAmount(input.target.value)}
            />
          </label>
          <label className="update-label">
            Unit:
            <input
              type="text"
              name="unit"
              value={ingrediantUnit}
              onChange={(input) => setIngrediantUnit(input.target.value)}
            />
          </label>
          <br />
          <button className="upload-button" type="submit">Submit Updates</button>
        </form>
      </div>
    </>
  );
};

export default UpdateRecipe;
