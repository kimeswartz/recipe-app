import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RecipeInterface } from "../interfaces/RecipeInterface";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import "../styling/RecipepageStyle.css";

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

  if (!recipe) return <div>Hämtar recept...</div>;

  return (
    <div className="recipe-container">
      <div className="header-container">
        <div className="text-container">
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>

          <div className="time-review-section">
            <div className="info-container">
              <div className="info-tag">
                <p>
                  <FontAwesomeIcon icon={faClock} className="clock-icon" />{" "}
                  {recipe.timeInMins} Minuter
                </p>
              </div>
            </div>

            <div className="info-container">
              <div className="info-tag">
                <p>
                  <FontAwesomeIcon icon={faStar} className="star-icon" /> 3/5
                  Betyg
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="img-container">
          <img src={recipe.imageUrl} alt={recipe.title} />
        </div>
      </div>

      <div className="ingredients-container">
        <div className="upper">
          <h2>Du behöver...</h2>
        </div>

        <div className="lower">
          <div className="centered-tags">
            <ul className="list-objects">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-name">
                  {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="instructions-section">
        <div className="ingredients-wrapper">
          <div className="centered-mobile">
            <h2>Ingridienser</h2>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="instructions-wrapper">
          <div className="centered-mobile">
            <h2>Gör såhär</h2>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key= {index} className="to-do-step"> {instruction} </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayOneRecipe;