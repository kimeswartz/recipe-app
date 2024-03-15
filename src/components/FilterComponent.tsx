import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const FilterComponent = () => {
  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [availableIngredients, setAvailableIngredients] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        setRecipe(response.data);
        setFilteredRecipes(response.data);
        console.log("Success fetching data from Swagger/Recipes");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterRecipes = () => {
    const filtered = recipeData.filter(recipe => {
      // Check if recipe contains all ingredients entered by user
      return recipe.ingredients.every(ingredient => availableIngredients.includes(ingredient.name));
    });
    setFilteredRecipes(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  const addIngredient = () => {
    setAvailableIngredients(prevState => [...prevState, userInput]);
    setUserInput('');
  };

  return (
    <div>
      <h1>Filter Recipes</h1>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={addIngredient}>Add Ingredient</button>
      <button onClick={filterRecipes}>Filter Recipes</button>
      <ul>
        {filteredRecipes.map(recipe => (
          <li key={recipe._id}>
            <img src={recipe.imageUrl} alt={recipe.title} />
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{`${ingredient.amount} ${ingredient.unit} ${ingredient.name}`}</li>
              ))}
            </ul>
            <p>{`Time: ${recipe.timeInMins} mins`}</p>
            <p>{`Categories: ${recipe.categories.join(", ")}`}</p>
            <ul>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterComponent;