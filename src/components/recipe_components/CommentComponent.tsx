import { useState } from 'react';
import globalRecipeFunctions from '../../store/RecipeAPICalls';
import "../../styling/CommentSectionStyle.css"

const CommentComponent = () => {
  const [commentText, setCommentText] = useState("");
  const { addComment, recipeComment, oneRecipe } = globalRecipeFunctions();

  const handleAddComment = () => {
    if (!commentText.trim()) {
      alert("Cannot add an empty comment.");
      return;
    }
    if (!oneRecipe._id) {
    alert("Recipe ID is undefined.");
    return;
    }
    addComment(commentText.trim(), oneRecipe._id);
    setCommentText("");
  };

  return (
    <div className="comments-section">
      <h3>Comments for this recipe</h3>
      <div className="adjust-content-with">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Leave a comment"
        ></textarea>
        <div className="comments-button-container">
          <button className="main-button" onClick={handleAddComment}>
            Send
          </button>
        </div>
        <div>
          {recipeComment.map((userReview, reviewKey) => (
            <p key={reviewKey}>{userReview.comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
