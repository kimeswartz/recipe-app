//Kim + Hampus + Malcolm + Arash

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import allRecipeState from "../../store/Endpoints";
import globalCartFunctions from "../../store/Cart";
import "../../styling/OneRecipePageStyle.css";
import "../../styling/CommentSectionStyle.css";
import RatingComponent from "./RatingComponent";

// Component for displaying a single recipe
const DisplayOneRecipe = () => {
  // Destructuring state and function from the state management
  const {
    oneRecipe,
    fetchOneRecipe,
    fetchComments,
    addComment,
    recipeComment,
  } = allRecipeState();
  const { addRecipeToCart } = globalCartFunctions();

  // Extracting recipeId from URL params
  // We use useParams to acces dynamic parts in the URL, in this case, the recipe ID, that will route to the recipe URL request
  const { recipeId } = useParams<{ recipeId: string }>();
  const [commentText, setCommentText] = useState(""); //arash
  const [trigger, setTrigger] = useState(false);

  // Fetch the recipe details when the component mounts or recipeId changes
  useEffect(() => {
    console.log("useEffect triggered with recipeId:", recipeId);
    if (recipeId) {
      fetchOneRecipe(recipeId);
      fetchComments(recipeId); //arash
    }
  }, [trigger]);

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      alert("Cannot add an empty comment.");
      return;
    }
    if (!oneRecipe._id) {
      alert("Recipe ID is undefined.");
      return;
    }

    addComment(commentText.trim(), oneRecipe._id);
    setTrigger(!trigger);
    setCommentText("");
  }; //arash

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
            <br />
            <h3>Vi rekomenderar ... till detta recept</h3>
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
              <div>
                <RatingComponent />
              </div>
              <div className="info-container">
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
        <div className="comments-section">
          <h3>Comments for this recipe</h3>
          <div className="adjust-content-with">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Leave a comment"
            ></textarea>
            <div className="comments-button-container">
              <button onClick={handleAddComment}>Send</button>
            </div>
            <div>
              {recipeComment.map((userReview, reviewKey) => (
                <p key={reviewKey}>{userReview.comment}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default DisplayOneRecipe;
