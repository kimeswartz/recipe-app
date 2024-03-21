import React, { useState } from "react";
import axios from "axios";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";

const UploadRecipe = () => {
  const initialRecipeState: UploadRecipeInterface = {
    title: "",
    description: "",
    ratings: [],
    imageUrl: "",
    timeInMins: 0,
    categories: [],
    instructions: [],
    ingredients: [{ name: "", amount: 0, unit: "" }],
  };

  const [recipeData, setRecipeData] = useState<UploadRecipeInterface>(
    initialRecipeState
  );

  const handleInputChange = (eventObject: any) => {
    const { name, value } = eventObject.target;
    setRecipeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleIngredientInput = (
    index: number,
    field: string,
    value: any
  ) => {
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

  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", amount: 0, unit: "" }],
    }));
  };

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

  const addInstruction = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, ""],
    }));
  };

  const handleSubmit = async (eventTrigger: any) => {
    eventTrigger.preventDefault();

    try {
      const response = await axios.post<UploadRecipeInterface>(
        "https://sti-java-grupp4-s4yjx9.reky.se/recipes",
        recipeData
      );

      console.log("POST request successful", response.data);

      setRecipeData(initialRecipeState);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const presetCategories = ["Breakfast", "Party", "Dinner", "Vegetarian"];

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
              checked={recipeData.categories.includes(category)}
              onChange={(e) => handleCategoryChange(e.target.value)}
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
        <button type="button" onClick={addIngredient}className="main-button">
          Add Ingredient
        </button>

        <button type="submit"className="main-button">Submit recipe to database</button>
      </form>
    </div>
  );
};

export default UploadRecipe;