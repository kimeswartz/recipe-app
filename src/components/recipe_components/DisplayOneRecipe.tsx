//Kim + Hampus + Malcolm + Arash

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar } from "@fortawesome/free-solid-svg-icons";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import globalCartFunctions from "../../store/GlobalCart";
import "../../styling/OneRecipePageStyle.css";
import "../../styling/CommentSectionStyle.css";
import CommentComponent from "../recipe_components/CommentComponent";

// Component for displaying a single recipe
const DisplayOneRecipe = () => {
  // Destructuring state and function from the state management
  const {
    oneRecipe,
    fetchOneRecipe,
    addRating,
    fetchComments,
  } = globalRecipeFunctions();
  const { addRecipeToCart } = globalCartFunctions();

  // Extracting recipeId from URL params
  // We use useParams to acces dynamic parts in the URL, in this case, the recipe ID, that will route to the recipe URL request
  const { recipeId } = useParams<{ recipeId: string }>();
  const [userRating, setUserRating] = useState<number>();
  const [trigger, setTrigger] = useState(false);

  // Fetch the recipe details when the component mounts or recipeId changes
  useEffect(() => {
    console.log("useEffect triggered with recipeId:", recipeId);
    if (recipeId) {
      fetchOneRecipe(recipeId);
      fetchComments(recipeId); //arash
    }
  }, [trigger]);

  // This will send a review to database between 1-5
  const handleRatingChange = async (rating: number) => {
    addRating(rating, oneRecipe._id).then(() => {
      setTrigger(!trigger);
    });
    setUserRating(rating);
  };



  // Conditional rendering based on whether the recipe has loaded or not
  if (!oneRecipe) {
    return <div>Loading recipe...</div>; // Display loading message
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
                    {oneRecipe.timeInMins} Minutes
                  </p>
                </div>
              </div>

              <div className="info-container">
                <div className="info-tag">
                  <p>
                    <FontAwesomeIcon icon={faStar} className="star-icon" />{" "}
                    {oneRecipe.avgRating !== null ? (
                      <span>{oneRecipe.avgRating?.toFixed(1)}/5</span>
                    ) : (
                      <span>Missing grade</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="info-container">
                <div className="info-tag">
                  {/* Interaktiv ratingsystem */}
                  <p>
                    Rate this dish: {""}
                    {[1, 2, 3, 4, 5].map((value) => (
                      <span
                        key={value}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRatingChange(value)}
                      >
                        <FontAwesomeIcon
                          icon={faStar}
                          className="star-icon"
                          color={value <= (userRating || 0) ? "yellow" : "red"}
                        />
                      </span>
                    ))}
                  </p>
                </div>
                <div className="info-container">
                  <button
                    onClick={() => addRecipeToCart(oneRecipe)}
                    className="main-button"
                  >
                    Add to list
                  </button>
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
            <h2>You need...</h2>
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
              <h2>Ingredients</h2>
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
              <h2>Do like this</h2>
              <ol>
                {/* Display step-by-step instructions */}
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
        {/* Section for displaying comments */}
        <div className="comments-section"> 
          <div className="adjust-content-with">
            <CommentComponent
            />
            </div>
          </div>
        </div>
    );
    
  }
};

export default DisplayOneRecipe;
