import React, { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const FilterComponent = () => {
  const [recipeData, setRecipeData] = useState<RecipeInterface[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeInterface[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>(
          "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
        );
        setRecipeData(response.data);
        setFilteredRecipes(response.data);
        console.log("Success fetching data from the recipe API");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filterRecipes = () => {
    const filtered = recipeData.filter(recipe => {
      // Check if recipe contains all ingredients entered by user
      return recipe.ingredients.some(ingredient =>
        userInput.toLowerCase().includes(ingredient.name.toLowerCase())
      );
    });
    setFilteredRecipes(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <h1>Filter Recipes</h1>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={filterRecipes}>Filter</button>
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
