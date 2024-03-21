import { useState } from "react";
import axios from "axios";

const DeleteRecipe = () => {
  const [recipeId, setRecipeId] = useState("");

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipeId}`
      );
      if (response.status === 204) {
        console.log("Recipe deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
      alert("NOT DELETED???");
    }
  };

  return (
    <div>
      <h2>Delete Recipe</h2>
      <input
        type="text"
        value={recipeId} // not necessary, just displays the value(recipeId) for the "user"
        onChange={(input) => setRecipeId(input.target.value)}
        placeholder="Enter the recipe id"
      />
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default DeleteRecipe;
