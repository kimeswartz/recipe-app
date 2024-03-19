import { useState } from "react";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";
import allRecipeState from "../state/Endpoints";

// Funktion med useState som håller våra värden från recipe interface.
// uppdaterar App varje gång recipeData uppdateras.
const UploadRecipeComponent = () => {

  const { addRecipe, fetchAllRecipes } = allRecipeState();

  const [recipeData, setRecipeData] = useState<UploadRecipeInterface>({

    title: "",
    description: "",
    ratings: [], // (Assuming ratings is an array of numbers)
    imageUrl: "",
    timeInMins: 0,
    categories: [],
    instructions: [],

    ingredients: [
      {
        name: "",
        amount: 0,
        unit: "",
      },
    ],
  });

  // ==========> FRÅGOR <==========
  /**
   * Varför används inte denna funktion som i DisplayRecipes -> const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);
   */
  // ==============================

  // Funktion till att spara användarens input från formulärsfältet.
  // name och value refererar till vårt interface API- fält. name: description, osv.
  // ...updateData möjliggör att uppdatera ett värde i receptet.
  // Om ett värde är samma som ett tidgare värde, uppdateras vår array.
  const handleInputUpdate = (event: any) => {
    const { name, value } = event.target;

    setRecipeData((updateData) => ({
      ...updateData, [name]: value,
    }));
  };

  // Funktion till att uppdatera objektet ingredients som är en del av vår array.
  // Låter användaren lägga till värden kopplat till varje ingridients.
  // setRecipeData är vår useState funktion, som uppdaterar recipeData
  // ...prevData skapar en "ytlig" kopia av ingridients och ersätter med uppdaterade värden.
  const handleIngredientInput = (index: number, field: string, value: any) => {

    setRecipeData((prevData) => {
      const updatedIngredients = [...prevData.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      };

      return {
        ...prevData,
        ingredients: updatedIngredients,
      };
    });
  };



  
  // Funktion till att addera ingridiener till vårt objekt 'ingridients'
  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData, ingredients: [
        ...prevData.ingredients,
        { name: "", amount: 0, unit: "" },
      ],
    }));
  };




  // Funktion som hanterar form data
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    addRecipe(recipeData, fetchAllRecipes);

    setRecipeData({

      title: "",
      description: "",
      ratings: [],
      imageUrl: "",
      timeInMins: 0,
      categories: [],
      instructions: [],

      ingredients: [
        {
          name: "",
          amount: 0,
          unit: "",
        },
      ],
    });
  };

  


  /*
  Allt som sker inom return paranteserna () är det användaren ser när vi kör applikationen
  */
  return (
    <div>
      <h1>Upload Recipe</h1>
      <form onSubmit={handleSubmit}>
        {/* Add form fields for other properties in RecipeInterface */}
    
        <label>
          Title:
          <input 
          type="text" 
          name="title" 
          value={recipeData.title} 
          onChange={handleInputUpdate} 
          />
        </label>
        <label>
        Description:
          <input 
          type="text" 
          name="description" 
          value={recipeData.description} 
          onChange={handleInputUpdate} 
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={recipeData.imageUrl}
            onChange={handleInputUpdate}
          />
        </label>
        <label>
        Time in mins:
          <input 
          type="number" 
          name="timeInMins" 
          value={recipeData.timeInMins} 
          onChange={handleInputUpdate} 
          />
        </label>
        <label>
        Category:
          <input 
          type="text" 
          name="categories" 
          value={recipeData.categories} 
          onChange={handleInputUpdate} 
          />
        </label>
        <label>
        Instructions:
          <input 
          type="text" 
          name="instructions" 
          value={recipeData.instructions} 
          onChange={handleInputUpdate} 
          />
        </label>

        <br />

        {/* Ingridienser */}
        <h2>Ingredients</h2>
        {recipeData.ingredients.map((ingredient, index) => (
          <div key={index}>
            <label>
              Ingredient Name:
              <input type="text" value={ingredient.name} onChange={(e) => handleIngredientInput(index, "name", e.target.value)} />
            </label>
            <label>
              Amount:
              <input type="number" value={ingredient.amount} onChange={(e) => handleIngredientInput(index, "amount", +e.target.value)} />
            </label>
            <label>
              Unit:
              <input type="text" value={ingredient.unit} onChange={(e) => handleIngredientInput(index, "unit", e.target.value)} />
            </label>
          </div>
        ))}

        <button type="button" onClick={addIngredient}>Add Ingredient</button>
        {/* Slutet på ingridienser */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UploadRecipeComponent;