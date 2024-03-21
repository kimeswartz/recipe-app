import { useState } from "react";
import allRecipeState from "../state/Endpoints";

const DeleteRecipe = () => {
  const [recipeId, setRecipeId] = useState("");
  const { deleteRecipe, fetchAllRecipes } = allRecipeState();

  const handleDelete = async () => {
    deleteRecipe(recipeId, fetchAllRecipes)
    setRecipeId('');
  };

  return (
    <div>
      <h2>Delete Recipe</h2>
      <input
        type="text"
        value={recipeId}
        onChange={(e) => setRecipeId(e.target.value)}
        placeholder="Enter the recipe id"
      />
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default DeleteRecipe;
