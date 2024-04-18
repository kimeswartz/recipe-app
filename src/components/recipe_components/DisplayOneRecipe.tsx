//Kim + Malcolm + Arash

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import globalCartFunctions from "../../store/CartFunctions";
import CocktailForRecipe from "../cocktail_components/CocktailForRecipe";
import RatingComponent from "./RatingComponent";
import CommentComponent from "../recipe_components/CommentComponent";
import "../../styling/recipe_css/OneRecipePage.css";
import "../../styling/recipe_css/CommentSection.css";

const DisplayOneRecipe = () => {
  const { oneRecipe, fetchOneRecipe, fetchComments } = globalRecipeFunctions();
  const { addRecipeToCart } = globalCartFunctions();

  const { recipeId } = useParams<{ recipeId: string }>();

  useEffect(() => {
    console.log("useEffect triggered with recipeId:", recipeId);
    if (recipeId) {
      fetchOneRecipe(recipeId);
      fetchComments(recipeId);
    }
  }, []);

  if (!oneRecipe) {
    return <div>Loading recipe...</div>;
  } else {
    return (
      <>
        <section className="standard-container">
          <div className="flex-header-container">
            <div className="text-container">
              <h1>{oneRecipe.title}</h1>
              <p>{oneRecipe.description}</p>
              {/* Display recipe time and rating */}
              <div className="time-review-section">
                <div className="info-container">
                  <div className="info-tag">
                    <p>
                      <FontAwesomeIcon icon={faClock} className="clock-icon" />{" "}
                      {oneRecipe.timeInMins} Minutes
                    </p>
                  </div>
                  <RatingComponent />
                </div>
                <div>
                  <CocktailForRecipe />
                  <button
                    onClick={() => addRecipeToCart(oneRecipe)}
                    className="main-button"
                  >
                    Add this recipe
                  </button>
                </div>
              </div>
            </div>
            <div className="img-container">
              <img src={oneRecipe.imageUrl} alt={oneRecipe.title} />
            </div>
          </div>
        </section>

        {/* Section displaying ingredients */}
        <section className="standard-container green-background">
          <div className="upper">
            <h2>You need...</h2>
          </div>

          <div className="lower">
            <div className="spacer-container">
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
        </section>

        {/* Instructions Section*/}
        <section className="standard-container">
          <div className="flex-container">
            <div className="ingredients-wrapper centered-mobile">
              <h2>Ingredients</h2>
              <ul>
                {oneRecipe.ingredients?.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className="instructions-wrapper">
              <div className="centered-mobile">
                <h2>Instructions</h2>
                <ol>
                  {/* Step-by-step Section */}
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
        </section>

        {/* Comments Section */}
        <section className="standard-container">
          <div className="adjust-content-with">
            <CommentComponent />
          </div>
        </section>
      </>
    );
  }
};

export default DisplayOneRecipe;
