//Kim + Hampus

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import allRecipeState from "../state/Endpoints";
import "../styling/RecipepageStyle.css";

const DisplayOneRecipe: React.FC = () => {
  const { oneRecipe, fetchOneRecipe } = allRecipeState();
  const { recipeId } = useParams<{ recipeId: string }>();
  const [userRating, setUserRating] = useState<number | null>(null);

  useEffect(() => {
    if (recipeId) {
      fetchOneRecipe(recipeId);
    }
  }, [fetchOneRecipe, recipeId]);




  const handleRatingChange = (rating: number) => {
    // Uppdatera betyget för det aktuella receptet i databasen
    // I detta exempel antar vi att det är en synkron process
    // Du kan behöva använda en asynkron metod för att skicka data till backend

    // Här antas det att vi skickar betyget till en funktion för att uppdatera receptet i databasen
    updateRatingInDatabase(rating);

    // Uppdatera det lokala betyget för att omedelbart reflektera användarens ändringar
    setUserRating(rating);
  };

  const updateRatingInDatabase = (rating: number) => {
    // Implementera funktionen för att uppdatera betyget för det aktuella receptet i databasen
    // Detta kan vara en AJAX-begäran till din server
    console.log(
      `Uppdatera betyget ${rating}/5 för receptet "${oneRecipe.title}" i databasen`
    );
  };







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
                    <FontAwesomeIcon icon={faStar} className="star-icon" />{" "}
                    {oneRecipe.avgRating !== null ? (
                      <span>{oneRecipe.avgRating}/5</span>
                    ) : (
                      <span>Missing review</span>
                    )}
                  </p>
                </div>
              </div>
              
              <div className="info-container">
                <div className="info-tag">
                  {/* Interaktivt betygssystem */}
                  <p>
                    Rate this recipe: {""}
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRatingChange(value)}
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          className="star-icon"
                          color={value <= (userRating || 0) ? "gold" : "gray"}
                        />
                      </span>
                    ))}
                    <FontAwesomeIcon icon={faStar} className="star-icon" />
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
                  <li key={index} className="to-do-step">
                    {" "}
                    {instruction}{" "}
                  </li>
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
