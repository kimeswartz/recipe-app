import React, { useState } from "react";
import axios from "axios";

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
        console.error('Error fetching recipe:', error);
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
  
        const response = await axios.patch(`${URL}/recipes/${recipeId}`,updatedRecipeData );
        
        if (response.status === 200) {
          // Hämta den uppdaterade informationen för receptet
          const updatedRecipe = await getRecipeById(recipeId);
          if (updatedRecipe) {
            // Uppdatera receptdata
            updatedRecipe;
            alert("Updated");
          }
        }
      } catch (error) {
        console.error('Error updating recipe:', error);
      }
    };


    return (
      <>
        <div>
          <h2>Update Recipe</h2>
          
          <form onSubmit={(e) => {
            e.preventDefault(); // Prevent default form submission behavior
            updateById(); // Call your update function
        }}>
            <label>
                Id:
                <input
                type="text"
                value={recipeId}
                onChange={(input) => setRecipeId(input.target.value)}
                placeholder="Enter ID to update"
                />
            </label>
            <br />
            <label>
                Title:
                <input 
                type="text" 
                name="title" 
                value={recipeName} 
                onChange={(e) => setRecipeName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Description:
                <input 
                type="text" 
                name="description" 
                value={recipeDescription} 
                onChange={(e) => setRecipeDescription(e.target.value)}
                />
            </label>
            <br />
            <label>
                Rating:
                <input 
                type="number" 
                name="description" 
                value={recipeRating} 
                onChange={(e) => setRecipeRating(e.target.valueAsNumber)}
                />
            </label>
            <br />
            <label>
                Image URL:
                <input
                    type="text"
                    name="imageUrl"
                    value={recipeImageUrl}
                    onChange={(e) => setRecipeImageUrl(e.target.value)}
                />
            </label>
            <br />
            <label>
                Time in mins:
                <input 
                type="number" 
                name="timeInMins" 
                value={recipeTimeInMin} 
                onChange={(e) => setRecipeTimeInMin(e.target.valueAsNumber)}
                />
            </label>
            <br />
            <label>
                Category:
                <input 
                type="text" 
                name="categories" 
                value={recipeCategory} 
                onChange={(e) => setRecipeCategory(e.target.value)}
                />
            </label>
            <br />
            <label>
              Instruction {index + 1}:
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionInput(index, e.target.value)}
              />
            </label>
            <br />
            <h2>Update Ingredients</h2>
            <label>
              Ingredient Name:
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientInput(index, "name", e.target.value)
                }
              />
            </label>

            <label>
              Amount:
              <input
                type="number"
                value={ingredient.amount}
                onChange={(e) =>
                  handleIngredientInput(index, "amount", e.target.value)
                }
              />
            </label>

            <label>
              Unit:
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientInput(index, "unit", e.target.value)
                }
              />
            </label>
          </div>
        ))}

        <button type="button" onClick={addIngredient} className="main-button">
          Add Ingredient
        </button>

        <button type="submit" className="main-button" >Submit recipe to database</button>
      </form>
    </div>
  );
};

export default UploadRecipe;