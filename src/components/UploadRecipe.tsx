import { useState } from "react";
import { UploadRecipeInterface } from "../interfaces/UploadInterface";
import allRecipeState from "../state/Endpoints";

const UploadRecipe = () => {

  const { addRecipe } = allRecipeState()

  const [recipeData, setRecipeData] = useState<UploadRecipeInterface>({
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

  // Function to handle input changes for recipe fields
  const handleInputUpdate = (event: any) => {
    const { name, value } = event.target;
    setRecipeData((updateData) => ({
      ...updateData,
      [name]: value,
    }));
  };

  // Function to handle changes in ingredient input fields
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

  // Function to add a new ingredient input field
  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", amount: 0, unit: "" }],
    }));
  };

  // Function to handle changes in instruction input fields
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

  // Function to add a new instruction input field
  const addInstruction = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, ""],
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    addRecipe(recipeData)

    // Reset vårt formulär efter submitted
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

  // Pre-defined categories
  const presetCategories = ["Breakfast", "Party", "Dinner", "Vegetarian"];

  // Function to handle changes in category selection
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
        {/* Input fields for recipe details */}
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={recipeData.title}
            onChange={handleInputUpdate}
          />
        </label>
        {/* Similar input fields for description, image URL, time, etc. */}
        
        {/* Category selection checkboxes */}
        <h2>Select categories</h2>
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
        
        {/* Input fields for instructions */}
        <h2>Instructions</h2>
        {/* Similar input fields for instructions */}

        {/* Input fields for ingredients */}
        <h2>Ingredients</h2>
        {/* Similar input fields for ingredients */}

        {/* Buttons to add new instruction and ingredient fields */}
        <button type="button" onClick={addInstruction}>
          Add Instruction
        </button>
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>
        
        {/* Submit button */}
        <button type="submit">Submit recipe to database</button>
      </form>
    </div>
  );
};

export default UploadRecipe;
