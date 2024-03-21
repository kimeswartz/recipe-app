import { useState } from "react";
import { UploadRecipeInterface } from "../../interfaces/UploadInterface";
import allRecipeState from "../../state/Endpoints";


// Funktion med useState som håller våra värden från recipe interface.
// uppdaterar App varje gång recipeData uppdateras.
const UploadRecipe = () => {

  const { addRecipe } = allRecipeState()

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

  // Funktion till att spara användarens input från formulärsfältet.
  // name och value refererar till vårt interface API- fält. name: description, osv.
  // ...updateData möjliggör att uppdatera ett värde i receptet.
  // Om ett värde är samma som ett tidgare värde, uppdateras vår array.
  const handleInputUpdate = (input: any) => {
    const { name, value } = input.target;

    setRecipeData((updateData) => ({
      ...updateData,
      [name]: value,
    }));
  };

  // Funktion till att uppdatera objektet ingredients som är en del av vår array.
  // Låter användaren lägga till värden kopplat till varje ingridients.
  // setRecipeData är vår useState funktion, som uppdaterar recipeData
  // ...prevData skapar en "ytlig" kopia av ingridients och ersätter med uppdaterade värden.
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

  // Funktion till att addera ingridiener till vårt objekt 'ingridients'
  const addIngredient = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", amount: 0, unit: "" }],
    }));
  };

  // Funktion som hanterar inmatning av instruktioner till användaren
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

  // Funktion till att addera ny instruktion
  const addInstruction = () => {
    setRecipeData((prevData) => ({
      ...prevData,
      instructions: [...prevData.instructions, ""], //Lägg till en ny tom string till representera en ny instruktion
    }));
  };

  // Funktion som hanterar form data
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // URL baserad på vår api, post med axios.
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
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  // Present för våra kategorier
  const presetCategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Vegetarian",
    "Party",
    "Asian",
    "Latin American",
  ];

  // Funktion till att hantera inmatning av kategories.
  const handleCategoryChange = (selectedCategory: string) => {
    setRecipeData((prevData) => {
      let updatedCategories;

      // Om kategorin redan är vald, ta bort den, annars lägg till den
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
      <section className="upload-container">
        <h1 className="upload-title">Upload Recipe</h1>
        <form onSubmit={handleSubmit}>
          {/* Add form fields for other properties in RecipeInterface */}

          <label className="upload-label">
            Title:
            <input
              type="text"
              name="title"
              value={recipeData.title}
              onChange={handleInputUpdate}
            />
          </label>
          <label className="upload-label">
            Description:
            <input
              type="text"
              name="description"
              value={recipeData.description}
              onChange={handleInputUpdate}
            />
          </label>
          <label className="upload-label">
            Image URL:
            <input
              type="text"
              name="imageUrl"
              value={recipeData.imageUrl}
              onChange={handleInputUpdate}
            />
          </label>
          <label className="upload-label">
            Time in mins:
            <input
              type="number"
              name="timeInMins"
              value={recipeData.timeInMins}
              onChange={handleInputUpdate}
            />
          </label>

          {/*Category*/}
          <h2 className="upload-h2">Choose Category</h2>
          {presetCategories.map((category, index) => (
            <label className="category-label" key={index}>
              <input
                className="category-checkbox"
                type="checkbox"
                value={category}
                checked={recipeData.categories.includes(category)} // Kontrollerar om kategorin redan är vald
                onChange={(e) => handleCategoryChange(e.target.value)} //Hanterar checkbox- ändringen
              />
              {category}
            </label>
          ))}

          {/*Intructions*/}
          <h2 className="upload-h2">Instructions</h2>
          {recipeData.instructions.map((instruction, index) => (
            <div key={index}>
              <label className="upload-label">
                Instruction {index + 1}:
                <input
                  type="text"
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionInput(index, e.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <button className="upload-button" type="button" onClick={addInstruction}>
            Add Instruction
          </button>

          <br />

          {/* Ingridienser */}
          <h2 className="upload-h2">Ingredients</h2>
          {recipeData.ingredients.map((ingredient, index) => (
            <div key={index}>
              <label className="upload-label">
                Ingredient Name:
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientInput(index, "name", e.target.value)
                  }
                />
              </label>

              <label className="upload-label">
                Amount:
                <input
                  type="number"
                  value={ingredient.amount}
                  onChange={(e) =>
                    handleIngredientInput(index, "amount", +e.target.value)
                  }
                />
              </label>

              <label className="upload-label">
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

          <button className="upload-button" type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
          {/* Slutet på ingridienser */}

          <button className="upload-button" type="submit">Submit recipe to database</button>
        </form>
      </section>
    </div>
  );
};

export default UploadRecipe;
