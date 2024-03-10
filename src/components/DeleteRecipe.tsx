import { useState } from "react";
import axios from "axios";

const DeleteRecipe = () => {
  const [recipeId, setRecipeId] = useState();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipeId}`
      );
      if (response.status === 200) {
        console.log("Recipe deleted successfully");
        alert("DELETED");
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
        value={recipeId}
        onChange={(e) => setRecipeId(e.target.value)}
        placeholder="Enter the recipe id"
      />
      <button onClick={handleDelete}>Delete Recipe</button>
    </div>
  );
};

export default DeleteRecipe;
