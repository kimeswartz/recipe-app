import { useState } from "react";
import allRecipeState from "../../store/Endpoints";
import uploadUpdateRecipeState from "../../store/UpdateAndUpload";

// Destructuring addRecipe function from the Zusand store, with direct access to the function in /Endpoints
const UploadRecipe = () => {
  const { addRecipe } = allRecipeState();

  // state to manage form data for uploading a recipe

  const { recipe, setTitle, setDescription, setImageUrl, setTimeInMins, setCategories, setInstructions, setIngredients, emptyRecipe } = uploadUpdateRecipeState();

  const [categoryList, setCategoryList] = useState<string[]>([]);


  // Function to handle form submission
  const handleSubmit = async (clickEvent: any) => {
    clickEvent.preventDefault();

    if (
      recipe.title === "" ||
      recipe.description === "" ||
      recipe.imageUrl === "" ||
      recipe.timeInMins === 0 ||
      recipe.instructions.some((instruction: string) => instruction === "") ||
      recipe.ingredients.some(
        (ingredient) => ingredient.name === "" || ingredient.amount === 0 || ingredient.unit === ""
      ) ||
      recipe.categories.length === 0
    ) {
      throw new Error("One field is empty");
    } else {
      addRecipe(recipe);
    }

    // Adding the recipe data to the database

    // Resetting the form fields after submission
  };

  // Preset categories for recipes
  const presetCategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Vegetarian",
    "Party",
    "Asian",
    "Latin American",
  ];

  // Present unit for ingredients
  const presentIngredientsUnit = ["l", "dl", "ml", "tbsp", "tsp", "g", "kg", "noOf"];

  // Function to handle category changes
  const handleCategoryChange = (selectedCategory: string) => {
    const updatedCategories = recipe.categories.includes(selectedCategory)
      ? recipe.categories.filter(category => category !== selectedCategory)
      : [...recipe.categories, selectedCategory]

    setCategories(updatedCategories);
  };

  const handleInstructionsChange = (newInstruction: string) => {
    const updatedInstructions = recipe.instructions.includes(newInstruction)
      ? recipe.instructions.filter(instruction => instruction !== newInstruction)
      : [...recipe.instructions, newInstruction];

    updatedInstructions.filter(instruction => instruction === '')

    setInstructions(updatedInstructions);
  }

  const handleIngredientChange = (index: number, field: string, value: string | number) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index] = {
      ...updatedIngredients[index],
      [field]: value,
    }
    setIngredients(updatedIngredients)
  }

  const handleAddIngredient = () => {
    const newIngredient = { name: '', amount: 0, unit: '' };
    const updatedIngredients = [...recipe.ingredients, newIngredient];
    setIngredients(updatedIngredients);
  };

  const handleAddInstruction = () => {
    const newInstruction = '';
    const updatedInstructions = [...recipe.instructions, newInstruction];
    setInstructions(updatedInstructions)
  };

  return (
    <div>
      <section className="upload-container">
        <h1 className="upload-title">Upload Recipe</h1>
        <form onSubmit={handleSubmit} >
          <label className="upload-label">
            Title:
            <input
              className="user-input"
              type="text"
              name="title"
              onChange={(input) => setTitle(input.target.value)}
            />
          </label>
          <label className="upload-label">
            Description:
            <input
              className="user-input"
              type="text"
              name="description"
              onChange={(input) => setDescription(input.target.value)}
            />
          </label>
          <label className="upload-label">
            Image URL:
            <input
              className="user-input"
              type="text"
              name="imageUrl"
              onChange={(input) => setImageUrl(input.target.value)}
            />
          </label>
          <label className="upload-label">
            Time in mins:
            <input
              className="user-input"
              type="number"
              name="timeInMins"
              onChange={(input) => setTimeInMins(parseInt(input.target.value))}
            />
          </label>

          <h2 className="upload-h2">Choose Category</h2>
          {presetCategories.map((category, index) => (
            <label className="category-label" key={index}>
              <input
                className="category-checkbox"
                type="checkbox"
                value={category}
                checked={recipe.categories.includes(category)}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              {category}
            </label>
          ))}

          <h2 className="upload-h2">Instructions</h2>
          {recipe.instructions.map((instruction, index) => (
            <div key={index}>
              <label className="upload-label">
                Instruction {index + 1}:
                <input
                  className="user-input"
                  type="text"
                  value={instruction}
                  onChange={(e) => handleInstructionsChange(e.target.value)}
                />
              </label>
            </div>
          ))}
          <button
            className="upload-button"
            type="button"
            onClick={handleAddInstruction}
          >
            Add Instruction
          </button>

          <br />

          <h2 className="upload-h2">Ingredients</h2>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index}>
              <label className="upload-label">
                Ingredient Name:
                <input
                  className="user-input"
                  type="text"
                  value={ingredient.name}
                  onChange={(input) => handleIngredientChange(index, 'name', input.target.value)}
                />
              </label>

              <div className="amount-unit-container">
                <label className="upload-label">
                  Amount:
                  <input
                    className="user-input"
                    type="number"
                    value={ingredient.amount}
                    onChange={(enteredByUser) => handleIngredientChange(index, "amount", enteredByUser.target.value)}
                  />
                </label>

                <label className="upload-label">
                  Unit:
                  <select
                    className="user-input"
                    value={ingredient.unit}
                    onChange={(selectedByUser) => handleIngredientChange(index, "unit", selectedByUser.target.value)}
                  >
                    {presentIngredientsUnit.map((unit, index) => (
                      <option key={index} value={unit}>
                        {unit}
                      </option>
                    ))}
                  </select>
                </label>

              </div>

            </div>
          ))}

          <button
            className="upload-button"
            type="button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>

          <div className="button-container">
            <button className="upload-button" type="submit">
              Submit recipe to database
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UploadRecipe;