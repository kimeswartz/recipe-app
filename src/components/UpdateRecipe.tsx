import axios from "axios";
import { useState } from "react";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const UpdateRecipe = () => {
  
    const URL = "https://sti-java-grupp4-s4yjx9.reky.se";
    const [recipeId, setRecipeId] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [recipeImageUrl, setRecipeImageUrl] = useState("");
    const [recipeTimeInMin, setRecipeTimeInMin] = useState(Number);
    const [recipeCategory, setRecipeCategory] = useState("");
    const [recipeIntructions, setRecipeInstructions] = useState("");
    const [, setRecipeData] = useState<RecipeInterface>();

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
          //ratings: "",
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
            setRecipeData(updatedRecipe);
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
                onChange={(e) => setRecipeId(e.target.value)}
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
                Instructions:
                <input 
                type="text" 
                name="instructions" 
                value={recipeIntructions} 
                onChange={(e) => setRecipeInstructions(e.target.value)}
                />
            </label>
            <br />
            <h2>Update Ingrediants</h2>
            <label>
                Ingredient Name:
                <input 
                type="text"
                name="ingredientName"
                value={ingrediantName}
                onChange={(e) => setIngrediantName(e.target.value)}
                 />
            </label>
            <label>
                Amount:
                <input 
                type="text"
                name="amount"
                value={ingrediantAmount}
                onChange={(e) => setIngrediantAmount(e.target.value)} 
                />
            </label>
            <label>
                Unit:
                <input 
                type="text"
                name="unit"
                value={ingrediantUnit}
                onChange={(e) => setIngrediantUnit(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit Updates</button>
          </form>
        </div>
      </>
    );
  };
  
  export default UpdateRecipe;