import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeInterface } from "../interfaces/RecipeInterface";

import "../styling/styles.css";

const DisplayOneRecipe: React.FC = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeInterface | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipeId}`
        );
        const data: RecipeInterface = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) return <div>Loading...</div>;

  return (


    <div className="recipe-container">
      <div className="header-container">

<div className="text-container">
<h1>{recipe.title}</h1>
        <p>{recipe.description}</p>
        <p>Tid: {recipe.timeInMins} minutes</p>
</div>

<div className="img-container">
<img src={recipe.imageUrl} alt={recipe.title} />
</div>

 

      </div>

      <div className="tag-section">

      <h2>Du behöver</h2>
      <ul className="list-objects">
        {recipe.ingredients.map((ingredient, index) => (

          <li key={index} className="ingredient-name">
            {ingredient.name}
          </li>

        ))}
      </ul>

      </div>

            <h2>Ingridienser</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>

      <h2>Gör såhär</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <h2>Kategori</h2>
      <ul>
        {recipe.categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>


  );
};

export default DisplayOneRecipe;
