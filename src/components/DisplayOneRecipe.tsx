//Kim + Hampus

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import allRecipeState from "../state/Endpoints";
import "../styling/RecipepageStyle.css";

// Component for displaying a single recipe
// Using React.FC to define a function component
const DisplayOneRecipe: React.FC = () => {

  // Destructuring state and function from the state management
  const { oneRecipe, fetchOneRecipe } = allRecipeState();

  // Extracting recipeId from URL params
  // we use useParams to acces dynamic parts in the URL, in this case, the recipe ID, that will route to the recipe URL request
  const { recipeId } = useParams<{ recipeId: string }>();

  // Fetch the recipe details when the component mounts or recipeId changes
  useEffect(() => {
    if (recipeId) {
      fetchOneRecipe(recipeId);
    }
  }, [recipeId]);

  // Conditional rendering based on whether the recipe has loaded or not
  if (!oneRecipe) {
    return <div>Hämtar recept...</div>; // Display loading message
  } else {
    return (
      <div className="recipe-container">
        
        {/* Header section displaying recipe title, description, time, and rating */}
        <div className="header-container">
          <div className="text-container">
            <h1>{oneRecipe.title}</h1> {/* Display recipe title */}
            <p>{oneRecipe.description}</p> {/* Display recipe description */}
            
            {/* Display recipe time and rating */}
            <div className="time-review-section">
              <div className="info-container">
                <div className="info-tag">
                  <p>
                    <FontAwesomeIcon icon={faClock} className="clock-icon" />{" "}
                    {oneRecipe.timeInMins} Minuter
                  </p>
                </div>
              </div>

              <div className="info-container">
                <div className="info-tag">
                  <p>
                    <FontAwesomeIcon icon={faStar} className="star-icon" /> {oneRecipe.avgRating?.toFixed(1)}/5
                    Betyg
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Display recipe image */}
          <div className="img-container">
            <img src={oneRecipe.imageUrl} alt={oneRecipe.title} />
          </div>
        </div>

        {/* Section displaying ingredients */}
        <div className="ingredients-container">
          <div className="upper">
            <h2>Du behöver...</h2>
          </div>

          <div className="lower">
            {/* List ingredients */}
            <div className="centered-tags">
              <ul className="list-objects">
                {oneRecipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="ingredient-name">
                    {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Section displaying instructions */}
        <div className="instructions-section">
          {/* Section for displaying ingredients */}
          <div className="ingredients-wrapper">
            <div className="centered-mobile">
              <h2>Ingridienser</h2>
              <ul>
                {/* Display ingredients with amount and unit */}
                {oneRecipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section for displaying instructions */}
          <div className="instructions-wrapper">
            <div className="centered-mobile">
              <h2>Gör såhär</h2>
              <ol>
                {/* Display step-by-step instructions */}
                {oneRecipe.instructions?.map((instruction, index) => (
                  <li key={index} className="to-do-step"> {instruction} </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DisplayOneRecipe;
