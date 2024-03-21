import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import allRecipeState from "../state/Endpoints";
import "../styling/RecipepageStyle.css";

const DisplayOneRecipe: React.FC = () => {

  const { oneRecipe, fetchOneRecipe } = allRecipeState();
  const { recipeId } = useParams<{ recipeId: string }>();

  useEffect(() => {
    if (recipeId) {
      fetchOneRecipe(recipeId)
    }
  }, [recipeId]);

  if (!oneRecipe) {
    return <div>Hämtar recept...</div>;
  } else {
    return (
      <div className="recipe-container">
        <div className="header-container">
          <div className="text-container">
            <h1>{oneRecipe.title}</h1>
            <p>{oneRecipe.description}</p>

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
                    <FontAwesomeIcon icon={faStar} className="star-icon" /> 3/5
                    Betyg
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="img-container">
            <img src={oneRecipe.imageUrl} alt={oneRecipe.title} />
          </div>
        </div>

        <div className="ingredients-container">
          <div className="upper">
            <h2>Du behöver...</h2>
          </div>

          <div className="lower">
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

        <div className="instructions-section">
          <div className="ingredients-wrapper">
            <div className="centered-mobile">
              <h2>Ingridienser</h2>
              <ul>
                {oneRecipe.ingredients?.map((ingredient, index) => (
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