//Malcolm + Hampus

import uploadUpdateRecipeState from "../../store/GlobalUpdateAndUpload";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { useState } from "react";
import { presetCategories, presetUnits } from "../../constants/RecipeConstants";

const AdminUpdateRecipe = () => {
  const {
    recipe,
    setTitle,
    setDescription,
    setImageUrl,
    setPrice,
    setTimeInMins,
    setCategories,
    setIngredients,
    setInstructions,
    removeIngredient,
    removeInstruction,
    emptyRecipe,
  } = uploadUpdateRecipeState();

  const { recipeList, updateRecipe } = globalRecipeFunctions();
  const [recipeId, setRecipeId] = useState<string | undefined>("");
  const [userInputInstructions, setUserInstructions] = useState("");
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    amount: 0,
    unit: "",
  });

  const handleInputChange = (value: string) => {
    setSearchTerms(value);
    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      generateSuggestions(value);
    }
  };

  const handleClear = () => {
    emptyRecipe();
    setSearchTerms("");
  };

  const generateSuggestions = (value: string) => {
    const filteredSuggestions = recipeList
      .filter((recipe) => {
        return (
          recipe &&
          recipe.title &&
          recipe.title.toLowerCase().includes(value.toLowerCase())
        );
      })
      .map((recipe) => recipe.title);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value: string) => {
    console.log(value);
    setSearchTerms(value);
    const selectedRecipe = recipeList.find(
      (recipe) => recipe.title.toLowerCase() === value.toLowerCase()
    );
    if (selectedRecipe) {
      setRecipeId(selectedRecipe._id);
      setTitle(selectedRecipe.title);
      setDescription(selectedRecipe.description);
      setImageUrl(selectedRecipe.imageUrl);
      setTimeInMins(selectedRecipe.timeInMins);
      setPrice(selectedRecipe.price);
      selectedRecipe.categories.forEach((categoryName) =>
        setCategories(categoryName)
      );
      selectedRecipe.instructions.forEach((instruction) =>
        setInstructions(instruction)
      );
      selectedRecipe.ingredients.forEach((ingredient) =>
        setIngredients(ingredient)
      );
    }
    setSuggestions([]);
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

  const handleSubmitInstruction = () => {
    if (userInputInstructions === "") {
      alert("field is empty");
    } else {
      setInstructions(userInputInstructions);
      setUserInstructions("");
    }
  };

  const handleCategoryChange = (selectCategory: string) => {
    setCategories(selectCategory);
  };

  return (
    <section className="standard-container">
      <div className="centered-container">
        <div className="spacer-container">
          <h2>Update recipe here</h2>
        </div>
        <div className="flex-horizontally-container">
          <input
            className="form-input"
            type="text"
            value={searchTerms}
            placeholder="Search recipe..."
            onChange={(e) => handleInputChange(e.target.value)}
          />
          <button onClick={handleClear}>Clear</button>
        </div>

        <section className="standard-container">
          <div className="centered-container">
            {searchTerms.trim() !== "" && (
              <div className="search-suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="search-suggestion"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <form
          className="update-form"
          onSubmit={(e) => {
            e.preventDefault();
            updateRecipe(recipe, recipeId);
            emptyRecipe();
            setSearchTerms("");
          }}
        >
          <label className="form-input">
            Title:
            <input
              className="user-input"
              type="text"
              value={recipe?.title ?? ""}
              onChange={(input) => setTitle(input.target.value)}
              placeholder="Recipe ID here"
            />
          </label>

          <label className="form-input">
            Description:
            <input
              className="user-input"
              type="text"
              name="description"
              value={recipe?.description ?? ""}
              onChange={(input) => setDescription(input.target.value)}
              placeholder="Description here"
            />
          </label>

          <label className="form-input">
            Image URL:
            <input
              className="user-input"
              type="text"
              name="imageUrl"
              value={recipe?.imageUrl ?? ""}
              onChange={(input) => setImageUrl(input.target.value)}
              placeholder="New image URL"
            />
          </label>

          <label className="form-input">
            Price:
            <input
              className="user-input"
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
              type="number"
              name="timeInMins"
              value={recipe?.timeInMins ?? ""}
              onChange={(input) => setTimeInMins(parseInt(input.target.value))}
            />
          </label>

          <div className="spacer-container">
            <h2 className="upload-h2">Choose category</h2>

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
          </div>

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
                      Clear
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="spacer-container">
            <h2>Instructions</h2>
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
            <br />
            <br />
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
                        Clear
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <h2 className="upload-h2">Ingredients</h2>
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

            <div className="amount-unit-container">
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
                  {presetUnits.map((unit, index) => (
                    <option key={index} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </label>
            </div>
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
          <br />
          <br />
          <br />
          <br />
          <button className="main-button" type="submit">
            Send updates
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminUpdateRecipe;
