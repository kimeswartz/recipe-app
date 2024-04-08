import uploadUpdateRecipeState from "../../store/GlobalUpdateAndUpload"
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { useEffect, useState } from "react";

const AdminUpdateRecipe = () => {

  const { recipe, setTitle, setDescription, setImageUrl, setTimeInMins, setCategories, setIngredients, setInstructions, removeIngredient, removeInstruction, emptyRecipe } = uploadUpdateRecipeState();
  const { recipeList, fetchAllRecipes, updateRecipe } = globalRecipeFunctions();
  const [userInputInstructions, setUserInstructions] = useState('')
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState({ name: '', amount: 0, unit: '' })

  useEffect(() => {
    fetchAllRecipes();
  }, [])

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
    setSearchTerms('');
  }

  const generateSuggestions = (value: string) => {
    const filteredSuggestions = recipeList
      .filter((recipe) =>
        recipe.title.toLowerCase().includes(value.toLowerCase())
      )
      .map((recipe) => recipe.title);
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (value: string) => {
    console.log(value)
    setSearchTerms(value);
    const selectedRecipe = recipeList.find((recipe) => recipe.title.toLowerCase() === value.toLowerCase())
    console.log(selectedRecipe)
    if (selectedRecipe) {
      setTitle(selectedRecipe.title);
      setDescription(selectedRecipe.description);
      setImageUrl(selectedRecipe.imageUrl);
      setTimeInMins(selectedRecipe.timeInMins)
      selectedRecipe.categories.map((categoryName) => setCategories(categoryName))
      selectedRecipe.instructions.map((instruction) => setInstructions(instruction))
      selectedRecipe.ingredients.map((ingredient) => setIngredients(ingredient))
      console.log('after values are set', recipe)
    }
    setSuggestions([]);
  };

  const handleSubmitIngredient = () => {
    if (newIngredient.name === '' || newIngredient.amount <= 0 || newIngredient.unit === '') {
      alert('one ore more fields are empty')
    } else {
      setIngredients(newIngredient)
      setNewIngredient({ name: '', amount: 0, unit: '' })
    }
  }

  const handleSubmitInstruction = () => {
    if (userInputInstructions === '') {
      alert('field is empty')
    } else {
      setInstructions(userInputInstructions)
      setUserInstructions('');
    }
  }

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

  const handleCategoryChange = (selectCategory: string) => {
    setCategories(selectCategory)
  }

  return (
    <div className="upload-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerms}
          placeholder="Search recipe..."
          onChange={(e) => handleInputChange(e.target.value)}
        />
        <button onClick={handleClear}>Clear</button>

        {searchTerms.trim() !== "" && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>

      <form className="update-form" onSubmit={() => updateRecipe(recipe, recipe._id)}>
        <label className="upload-label">
          Title:
          <input
            className="user-input"
            type="text"
            value={recipe?.title ?? ''}
            onChange={(input) => setTitle(input.target.value)}
            placeholder="Recipe ID here"
          />
        </label>

        <label className="upload-label">
          Description:
          <input
            className="user-input"
            type="text"
            name="description"
            value={recipe?.description ?? ''}
            onChange={(input) => setDescription(input.target.value)}
            placeholder="Description here"
          />
        </label>

        <label className="upload-label">
          Image URL:
          <input
            className="user-input"
            type="text"
            name="imageUrl"
            value={recipe?.imageUrl ?? ''}
            onChange={(input) => setImageUrl(input.target.value)}
            placeholder="New image URL"
          />
        </label>

        <label className="upload-label">
          Time in min:
          <input
            className="user-input"
            type="number"
            name="timeInMins"
            value={recipe?.timeInMins ?? ''}
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
                  <button onClick={() => removeInstruction(instructionNumber)} className="main-button">
                    X
                  </button>
                </li>
              )
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
          className="upload-button"
          type="button"
          onClick={() => handleSubmitInstruction()}
        >
          Add instruction
        </button>


        <div>
          <ul>
            {recipe.ingredients?.map((ingredientInfo, ingredientKey) => {
              return (
                <li key={ingredientKey}>
                  {ingredientInfo.name} | {ingredientInfo.amount} | {ingredientInfo.unit}
                  <button onClick={() => removeIngredient(ingredientKey)} className="main-button">
                    X
                  </button>
                </li>
              )
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
              onChange={(input) => setNewIngredient({ ...newIngredient, name: input.target.value })}
            />
          </label>

          <div className="amount-unit-container">
            <label className="upload-label">
              Amount:
              <input
                className="user-input"
                type="number"
                value={newIngredient.amount}
                onChange={(input) => setNewIngredient({ ...newIngredient, amount: +input.target.value })}
              />
            </label>

            <label className="upload-label">
              Unit:
              <select
                className="user-input"
                defaultValue=""
                onChange={(input) => setNewIngredient({ ...newIngredient, unit: input.target.value })}
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
          className="upload-button"
          type="button"
          onClick={() => handleSubmitIngredient()}
        >
          Add ingredient
        </button>
        <br />
        <button className="main-button" type="submit">
          Send updates
        </button>
      </form>

    </div>
  )
}

export default AdminUpdateRecipe