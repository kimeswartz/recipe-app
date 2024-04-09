//Malmcolm + Kim + Hampus

import { useState } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import uploadUpdateRecipeState from "../../store/GlobalUpdateAndUpload";

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
    setCategories(selectCategory);
  };

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
      <section className="standard-container">
        <div className="centered-container">
          <form onSubmit={handleSubmit}>
            <h2>Upload Recipe</h2>
            <p>
              Upload your recipe step by step, all fields must be filled in for
              the recipe to be added to the database!
            </p>
            <label className="form-input">
              Titel:
              <input
                className="user-input"
                type="text"
                name="title"
                value={recipe.title}
                onChange={(input) => setTitle(input.target.value)}
              />
            </label>
            <label className="form-input">
              Descriptions:
              <input
                className="user-input"
                type="text"
                name="description"
                value={recipe.description}
                onChange={(input) => setDescription(input.target.value)}
              />
            </label>
            <label className="form-input">
              Image URL:
              <input
                className="user-input"
                type="text"
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={(input) => setImageUrl(input.target.value)}
              />
            </label>
            <label className="form-input">
              Time in min:
              <input
                className="user-input"
                type="number"
                name="timeInMins"
                value={recipe.timeInMins}
                onChange={(input) =>
                  setTimeInMins(parseInt(input.target.value))
                }
              />
            </label>
          </form>
        </div>

        <div className="spacer-container">
          <form onSubmit={handleSubmit}>
            <h2>Choose category</h2>
            {presetCategories.map((category, index) => (
              <label className="category-label" key={index}>
                <input
                  className="input-checkbox"
                  type="checkbox"
                  value={category}
                  checked={recipe.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                {category}
              </label>
            ))}
          </form>
        </div>

        <div className="centered-container">
          <form onSubmit={handleSubmit}>
            <div>
              <ul>
                {recipe.instructions?.map((instruction, instructionNumber) => {
                  return (
                    <li key={instructionNumber}>
                      {instructionNumber + 1}:{instruction}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeInstruction(instructionNumber);
                        }}
                        className="main-button"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </form>

          <form onSubmit={handleSubmit}>
            <h2>Add the Instructions here!</h2>
            <p>
              Please input each instruction line by line. After publishing, the
              output will automatically add a clear number to each instruction
              for easy reference.
            </p>
            <div>
              <label className="form-input">
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

            <div className="spacer-container">
              <button
                className="main-button"
                type="button"
                onClick={() => handleSubmitInstruction()}
              >
                Add instruction
              </button>
            </div>
          </form>
        </div>

        <div className="centered-container">
          <form onSubmit={handleSubmit}>
            <br />
            <div>
              <ul>
                {recipe.ingredients?.map((ingredientInfo, ingredientKey) => {
                  return (
                    <li key={ingredientKey}>
                      {ingredientInfo.name} | {ingredientInfo.amount} |{" "}
                      {ingredientInfo.unit}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          removeIngredient(ingredientKey);
                        }}
                        className="main-button"
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="spacer-container">
              <h2>Ingredients</h2>
            </div>
            <div>
              <label className="form-input">
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

              <label className="form-input">
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

              <label className="form-input toggle-input">
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

            <div className="spacer-container">
              <button
                className="main-button"
                type="button"
                onClick={() => handleSubmitIngredient()}
              >
                Add ingredient
              </button>
            </div>
          </form>
        </div>
        <div className="spacer-container">
          <div className="button-container">
            <button className="main-button" type="submit">
              Submit recipe to database
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UploadRecipe;
