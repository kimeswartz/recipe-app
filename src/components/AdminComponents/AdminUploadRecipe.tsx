import { useState } from "react";
import allRecipeState from "../../state/Endpoints";
import { RecipeInterface } from "../../interfaces/RecipeInterface";

// Destructuring addRecipe function from the Zusand store, with direct access to the function in /Endpoints
const UploadRecipe = () => {
  const { addRecipe } = allRecipeState();

  // state to manage form data for uploading a recipe
  const [recipeData, setRecipeData] = useState<RecipeInterface>({
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

  // Event handler function to handle input updates for recipe fields
  const handleInputUpdate = (input: any) => {
    const { name, value } = input.target;

    setRecipeData((updateData) => ({
      ...updateData,
      [name]: value,
    }));
  };

  // Function to add a new ingredient input to the recipe
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

  // Function to add a new ingredient to the recipe
  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", amount: 0, unit: "" }],
    }));
  };

  // Function to handle input updates for instruction fields
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

  // Function to add a new instruction to the recipe
  const addInstruction = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, ""],
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (clickEvent: any) => {
    clickEvent.preventDefault();

    try {
      // Checking if any required fields are empty
      if (
        recipeData.title === "" ||
        recipeData.description === "" ||
        recipeData.imageUrl === "" ||
        recipeData.timeInMins === 0 ||
        recipeData.instructions.some((instruction: string) => instruction === "") ||
        recipeData.ingredients.some(
          (ingredient) => ingredient.name === "" || ingredient.amount === 0 || ingredient.unit === ""
        ) ||
        recipeData.categories.length === 0
      ) {
        throw new Error("Ett fält är tomt");
      }

      // Adding the recipe data to the database
      addRecipe(recipeData);

      // Resetting the form fields after submission
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
      alert("Vänligen fyll i alla fält");
      return;
    }
  };

  // Preset categories for recipes
  const presetCategories = [
    "Frukost",
    "Lunch",
    "Middag",
    "Vegetarisk",
    "Festlig",
    "Asiatisk",
    "Latin Amerikansk",
  ];

  // Present unit for ingredients
  const presentIngredientsUnit = ["kg", "hg", "g", "l", "dl", "ml", "msk", "tsk", "krm", "st"];

  // Function to handle category changes
  const handleCategoryChange = (selectedCategory: string) => {
    setRecipeData((prevData) => {
      let updatedCategories;

      if (prevData.categories.includes(selectedCategory)) {
        updatedCategories = prevData.categories.filter((category) => category !== selectedCategory);
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
      <section className="upload-container">
        <h1 className="upload-title">Upload Recipe</h1>
        <form onSubmit={handleSubmit} >
          <label className="upload-label">
            Titel:
            <input
              className="user-input"
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleInputUpdate}
            />
          </label>
          <label className="upload-label">
            Beskrivning:
            <input
              className="user-input"
              type="text"
              name="description"
              value={recipeData.description}
              onChange={handleInputUpdate}
            />
          </label>
          <label className="upload-label">
            Bild URL:
            <input
              className="user-input"
              type="text"
              name="imageUrl"
              value={recipeData.imageUrl}
              onChange={handleInputUpdate}
            />
          </label>
          <label className="upload-label">
            Tid i min:
            <input
              className="user-input"
              type="number"
              name="timeInMins"
              value={recipeData.timeInMins}
              onChange={handleInputUpdate}
            />
          </label>

          <h2 className="upload-h2">Välj Kategori</h2>
          {presetCategories.map((category, index) => (
            <label className="category-label" key={index}>
              <input
                className="category-checkbox"
                type="checkbox"
                value={category}
                checked={recipeData.categories.includes(category)}
                onChange={(e) => handleCategoryChange(e.target.value)}
              />
              {category}
            </label>
          ))}

          <h2 className="upload-h2">Instruktioner</h2>
          {recipeData.instructions.map((instruction, index) => (
            <div key={index}>
              <label className="upload-label">
                Instruktioner {index + 1}:
                <input
                  className="user-input"
                  type="text"
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionInput(index, e.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <button
            className="upload-button"
            type="button"
            onClick={addInstruction}
          >
            Lägg till instruktion
          </button>

          <br />

          <h2 className="upload-h2">Ingredienser</h2>
          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <label className="upload-label">
                Ingrediens namn:
                <input
                  className="user-input"
                  type="text"
                  value={ingredient.name}
                  onChange={(enteredByUser) =>
                    handleIngredientInput(
                      index,
                      "name",
                      enteredByUser.target.value
                    )
                  }
                />
              </label>


<div className="amount-unit-container">


              <label className="upload-label">
                Antal:
                <input
                  className="user-input"
                  type="number"
                  value={ingredient.amount}
                  onChange={(enteredByUser) =>
                    handleIngredientInput(
                      index,
                      "amount",
                      +enteredByUser.target.value
                    )
                  }
                />
              </label>

              <label className="upload-label">
                Unit:
                <select
                  className="user-input"
                  value={ingredient.unit}
                  onChange={(selectedByUser) =>
                    handleIngredientInput(
                      index,
                      "unit",
                      selectedByUser.target.value
                    )
                  }
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
            onClick={addIngredient}
          >
            Lägg till ingrediens
          </button>

<div className="button-container">
          <button className="upload-button" type="submit">
            Skicka recept till databas
          </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UploadRecipe;