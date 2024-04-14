//Malmcolm + Kim + Hampus

import { useEffect, useState } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import uploadUpdateRecipeState from "../../store/GlobalUpdateAndUpload";
import { presetCategories, presetUnits } from "../../constants/RecipeConstants";

const UploadRecipe = () => {
  const { addRecipe } = globalRecipeFunctions();
  const {
    recipe,
    setTitle,
    setDescription,
    setImageUrl,
    setPrice,
    setTimeInMins,
    setCategories,
    setInstructions,
    setIngredients,
    removeInstruction,
    removeIngredient,
    emptyRecipe,
  } = uploadUpdateRecipeState();

  const [userInputInstructions, setUserInstructions] = useState("");
  const [resetUnit, setResetUnit] = useState(false);
  const [unitInputKey, setUnitInputKey] = useState(0);

  useEffect(() => {
    if(resetUnit){
      setNewIngredient({ name: "", amount: 0, unit: ""})
      setUnitInputKey(prevKey => prevKey + 1); 
    }
  }, [resetUnit])

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
      recipe.timeInMins < 1 ||
      recipe.price < 1 ||
      recipe.instructions.some((instruction: string) => instruction === "") ||
      recipe.ingredients.some(
        (ingredient) =>
          ingredient.name === "" ||
          ingredient.amount <= 0 ||
          ingredient.unit === ""
      ) ||
      recipe.categories.length === 0
    ) {
      alert("Incorrect data input");
    } else {
      console.log(recipe);
      addRecipe(recipe);
      emptyRecipe();
      setNewIngredient({name: '', amount: 0, unit: ''})
      setResetUnit(true);
      alert("Recipe added to the database");
    }
  };

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
      setNewIngredient({ ...newIngredient, name: "", amount: 0 });
    }
  };

  return (
    <div>
      <section className="standard-container">
        <div className="centered-container">
          <form onSubmit={handleSubmit}>
            <div className="spacer-container">
              <h2>Upload Recipe</h2>
              <p>
                Upload your recipe step by step, all fields must be filled in
                for the recipe to be added to the database!
              </p>
              <label className="form-input">
                Titel:
                <input
                  className="user-input"
                  id="addTitle"
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
                  id="addDescription"
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
                  id="addImageUrl"
                  type="text"
                  name="imageUrl"
                  value={recipe.imageUrl}
                  onChange={(input) => setImageUrl(input.target.value)}
                />
              </label>
              <label className="form-input">
                Price:
                <input
                  className="user-input"
                  id="addPrice"
                  type="number"
                  name="Price"
                  value={recipe.price}
                  onChange={(input) => setPrice(parseInt(input.target.value))}
                />
              </label>
              <label className="form-input">
                Time in min:
                <input
                  className="user-input"
                  id="addTimeInMin"
                  type="number"
                  name="timeInMins"
                  value={recipe.timeInMins}
                  onChange={(input) =>
                    setTimeInMins(parseInt(input.target.value))
                  }
                />
              </label>
            </div>

            <h2>Choose category</h2>
            <div className="flex-container">
              {presetCategories.map((category, index) => (
                <div className="spacer-container" key={index}>
                  <label className="category-label" key={index}>
                    <input
                      className="input-checkbox"
                      id="chooseCategoryCheckbox"
                      type="checkbox"
                      value={category}
                      checked={recipe.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    {category}
                  </label>
                </div>
              ))}
            </div>
            <div>
              <ul>
                {recipe.instructions?.map((instruction, instructionNumber) => (
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
                ))}
              </ul>
            </div>
            <div className="spacer-container">
              <h2>Add the Instructions here!</h2>

              <p>
                Please input each instruction line by line. After publishing,
                the output will automatically add a clear number to each
                instruction for easy reference.
              </p>
              <div>
                <label className="form-input">
                  Instruction :
                  <input
                    className="user-input"
                    id="addInstruction"
                    type="text"
                    name="instruction"
                    value={userInputInstructions}
                    onChange={(input) =>
                      setUserInstructions(input.target.value)
                    }
                  />
                </label>
              </div>
              <div className="spacer-container">
                <button
                  className="main-button"
                  id="addInstructionBtn"
                  type="button"
                  onClick={() => handleSubmitInstruction()}
                >
                  Add instruction
                </button>
              </div>
            </div>
            <br />
            <div>
              <ul>
                {recipe.ingredients?.map((ingredientInfo, ingredientKey) => (
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
                ))}
              </ul>
            </div>
            <h2>Ingredients</h2>
            <div>
              <label className="form-input">
                Ingredient Name:
                <input
                  className="user-input"
                  id="addIngredient"
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
                  id="addAmount"
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
                  id="addIngredientUnit"
                  defaultValue={""}
                  key={unitInputKey}
                  onChange={(input) =>
                    setNewIngredient({
                      ...newIngredient,
                      unit: input.target.value,
                    })
                  }
                >
                  <option disabled hidden></option>
                  {presetUnits.map((unit, index) => (
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
                id="addIngredientBtn"
                type="button"
                onClick={() => handleSubmitIngredient()}
              >
                Add ingredient
              </button>
            </div>
            <div className="button-container">
              <button className="main-button" id="submitBtn" type="submit">
                Submit recipe to database
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UploadRecipe;