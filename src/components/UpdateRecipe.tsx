import React, { useState } from "react";
import axios from "axios";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";

const UploadRecipe = () => {
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

  // This function is to update the previous recipe data array, with the new recipe- data, and will accept any type.
  // The name and value represents the property name and value in our UploadRecipeInterface
  const handleInputChange = (eventObject: any) => {
    const { name, value } = eventObject.target;

    // The update of the previous array of recipe data is here.
    // The spread operator (...) is implementing the new object (recipe) to the array containing our recipes.
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // To update the array of ingredients withing the array of the recipe array.
  // index represents the position of the ingredients within the ingredients array, data value is not specified, field represents the name (string) of the ingredient.
  // The spread operator updates the previous ingredient string to the new string provided by the user.
  // Returing the updated ingredient string to the user.

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

  // To update the ingredients array with the acutal values provided by the user.
  // The spread operator adds new array(s) inside the ingredients array.

  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", amount: 0, unit: "" }],
    }));
  };

  // To update the instruction array within the recipe array.
  // The spread operator creates a new instructions from the previous array, and adds it to the updated array, to return a new instructions array.
  const handleInstructionInput = (index: number, value: string) => {
    setRecipeData((prevData) => {
      const updateInstructions = [...prevData.instructions];
      updateInstructions[index] = value;

      return {
        ...prevData,
        instructions: updateInstructions,
      };
    });
  };

  // To add new object(s) within the instructions array.
  // The "" is to represent an empty field with type string, to add a new instruction.
  const addInstruction = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, ""],
    }));
  };

  // Using the async function to await the data transfer to the database, until the user has submit the information.
  // Ther eventTrigger is an object of whoch is associated with the event of a form submission.
  // The preventDefault function is to ensure that the form is not submitted in the feault way (which would case a page reload)
  // The await keyword allwos the function to wait for the response from the server before execution.

  const handleSubmit = async (eventTrigger: any) => {
    eventTrigger.preventDefault();

    try {
      const response = await axios.post<UploadRecipeInterface>(
        "https://sti-java-grupp4-s4yjx9.reky.se/recipes",
        recipeData
      );

      console.log("POST request successful", response.data);

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
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Predefined categories options from which user can select.
  // This will "fill out" the field for the user with a string
  const presetCategories = ["Breakfast", "Party", "Dinner", "Vegetarian"];

  // To update the category by copy the previous string data and update to the new data provided by the user
  // The filter is used to remove the old categories from the array if its not the same as the old array
  // The spread operator takes the old array, and updates it to the new array.

  const handleCategoryChange = (selectedCategory: string) => {
    setRecipeData((prevData) => {
      let updatedCategories;

      if (prevData.categories.includes(selectedCategory)) {
        updatedCategories = prevData.categories.filter(
          (category) => category !== selectedCategory
        );
      } else {
        updatedCategories = [...prevData.categories, selectedCategory];
      }

      return {
        ...prevData,
        categories: updatedCategories,
      };
    });
  };

  return (
    <div>
      <h1>Upload Recipe</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Description:
          <input
            type="text"
            name="description"
            value={recipeData.description}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={recipeData.imageUrl}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Time in mins:
          <input
            type="number"
            name="timeInMins"
            value={recipeData.timeInMins}
            onChange={handleInputChange}
          />
        </label>

        <br />

        <h2>Välj kategorier</h2>
        {presetCategories.map((category, index) => (
          <label key={index}>
            <input
              type="checkbox"
              value={category}
              checked={recipeData.categories.includes(category)} // Kontrollerar om kategorin redan är vald
              onChange={(e) => handleCategoryChange(e.target.value)} //Hanterar checkbox- ändringen
            />
            {category}
          </label>
        ))}

        <h2>Instructions</h2>
        {recipeData.instructions.map((instruction, index) => (
          <div key={index}>
            <label>
              Instruction {index + 1}:
              <input
                type="text"
                value={instruction}
                onChange={(e) => handleInstructionInput(index, e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={addInstruction} className="main-button">
          Add Instruction
        </button>

        <br />

        <h2>Ingredients</h2>
        {recipeData.ingredients.map((ingredient, index) => (
          <div key={index}>
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
