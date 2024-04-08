//Malmcolm + Kim + Hampus

import { useState } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import uploadUpdateRecipeState from "../../store/UpdateAndUpload";

const UploadRecipe = () => {
  const { addRecipe } = globalRecipeFunctions();
  const {
    recipe,
    setTitle,
    setDescription,
    setImageUrl,
    setTimeInMins,
    setCategories,
    setInstructions,
    setIngredients,
    removeInstruction,
    removeIngredient,
    emptyRecipe,
  } = uploadUpdateRecipeState();

  const [userInputInstructions, setUserInstructions] = useState("");

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: 0,
    unit: "",
  });

  // Function to handle form submission
  const handleSubmit = (clickEvent: any) => {
    clickEvent.preventDefault();

    if (
      recipe.title === "" ||
      recipe.description === "" ||
      recipe.imageUrl === "" ||
      recipe.timeInMins === 0 ||
      recipe.instructions.some((instruction: string) => instruction === "") ||
      recipe.ingredients.some(
        (ingredient) =>
          ingredient.name === "" ||
          ingredient.amount <= 0 ||
          ingredient.unit === ""
      ) ||
      recipe.categories.length === 0
    ) {
      alert("One or more fields are empty");
    } else {
      console.log(recipe);
      addRecipe(recipe);
      emptyRecipe();
    }
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
  const presentIngredientsUnit = [
    "l",
    "dl",
    "ml",
    "tbsp",
    "tsp",
    "g",
    "kg",
    "noOf",
  ];

  const handleCategoryChange = (selectCategory: string) => {
    setCategories(selectCategory)
  }

  const handleSubmitInstruction = () => {
    if (userInputInstructions === "") {
      alert("field is empty");
    } else {
      setInstructions(userInputInstructions);
      setUserInstructions("");
    }
  };

  const handleSubmitIngredient = () => {
    if (
      newIngredient.name === "" ||
      newIngredient.amount <= 0 ||
      newIngredient.unit === ""
    ) {
      alert("one ore more fields are empty");
    } else {
      setIngredients(newIngredient);
      setNewIngredient({ name: "", amount: 0, unit: "" });
    }
  };

  return (
    <div>
      <section className="upload-container">
        <h1 className="upload-title">Upload Recipe</h1>
        <form onSubmit={handleSubmit}>
          <label className="upload-label">
            Titel:
            <input
              className="user-input"
              type="text"
              name="title"
              value={recipe.title}
              onChange={(input) => setTitle(input.target.value)}
            />
          </label>
          <label className="upload-label">
            Descriptions:
            <input
              className="user-input"
              type="text"
              name="description"
              value={recipe.description}
              onChange={(input) => setDescription(input.target.value)}
            />
          </label>
          <label className="upload-label">
            Image URL:
            <input
              className="user-input"
              type="text"
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={(input) => setImageUrl(input.target.value)}
            />
          </label>
          <label className="upload-label">
            Time in min:
            <input
              className="user-input"
              type="number"
              name="timeInMins"
              value={recipe.timeInMins}
              onChange={(input) => setTimeInMins(parseInt(input.target.value))}
            />
          </label>

          <h2 className="upload-h2">Choose category</h2>
          {presetCategories.map((category, index) => (
            <label className="category-label" key={index}>
              <input
                className="category-checkbox"
                type="checkbox"
                value={category}
                checked={recipe.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}

          <div>
            <ul>
              {recipe.instructions?.map((instruction, instructionNumber) => {
                return (
                  <li key={instructionNumber}>
                    {instructionNumber + 1}:{instruction}
                    <button
                      onClick={() => removeInstruction(instructionNumber)}
                      className="main-button"
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <h2 className="upload-h2">Instructions</h2>
          <div>
            <label className="upload-label">
              Instruction :
              <input
                className="user-input"
                type="text"
                name="instruction"
                value={userInputInstructions}
                onChange={(input) => setUserInstructions(input.target.value)}
              />
            </label>
          </div>
          <button
            className="main-button"
            type="button"
            onClick={() => handleSubmitInstruction()}
          >
            Add instruction
          </button>

          <br />
          <div>
            <ul>
              {recipe.ingredients?.map((ingredientInfo, ingredientKey) => {
                return (
                  <li key={ingredientKey}>
                    {ingredientInfo.name} | {ingredientInfo.amount} |{" "}
                    {ingredientInfo.unit}
                    <button
                      onClick={() => removeIngredient(ingredientKey)}
                      className="main-button"
                    >
                      X
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <h2 className="upload-h2">Ingredients</h2>
          <div>
            <label className="upload-label">
              Ingredient Name:
              <input
                className="user-input"
                type="text"
                value={newIngredient.name}
                onChange={(input) =>
                  setNewIngredient({
                    ...newIngredient,
                    name: input.target.value,
                  })
                }
              />
            </label>

            <div className="amount-unit-container">
              <label className="upload-label">
                Amount:
                <input
                  className="user-input"
                  type="number"
                  value={newIngredient.amount}
                  onChange={(input) =>
                    setNewIngredient({
                      ...newIngredient,
                      amount: +input.target.value,
                    })
                  }
                />
              </label>

              <label className="upload-label">
                Unit:
                <select
                  className="user-input"
                  defaultValue=""
                  onChange={(input) =>
                    setNewIngredient({
                      ...newIngredient,
                      unit: input.target.value,
                    })
                  }
                >
                  <option disabled hidden></option>
                  {presentIngredientsUnit.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <button
            className="main-button"
            type="button"
            onClick={() => handleSubmitIngredient()}
          >
            Add ingredient
          </button>

          <div className="button-container">
            <button className="main-button" type="submit">
              Submit recipe to database
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UploadRecipe;
