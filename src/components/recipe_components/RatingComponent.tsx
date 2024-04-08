import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingComponent = () => {
  const { oneRecipe, addRating } = globalRecipeFunctions();
  const [userRating, setUserRating] = useState<number>();
  const [trigger, setTrigger] = useState(false);

  // This will send a review to database between 1-5
  const handleRatingChange = async (rating: number) => {
    addRating(rating, oneRecipe._id).then(() => {
      setTrigger(!trigger);
    });
    setUserRating(rating);
  };

  const handleRatingHover = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div className="info-container">
      <div className="info-tag">
        <p>
          <FontAwesomeIcon icon={faStar} className="star-icon" />{" "}
          {oneRecipe.avgRating !== null ? (
            <span>{oneRecipe.avgRating?.toFixed(1)}/5</span>
          ) : (
            <span>No rating</span>
          )}
        </p>
      </div>
      <div className="info-tag">
        {/* Interaktiv ratingsystem */}
        <p>
          Rate this dish: {""}
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              style={{ cursor: "pointer" }}
              onClick={() => handleRatingChange(value)}
              onMouseEnter={() => handleRatingHover(value)}
              onMouseLeave={() => handleRatingHover(0)}
            >
              <FontAwesomeIcon
                icon={faStar}
                className="star-icon"
                color={value <= (userRating || 0) ? "white" : "red"}
              />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default RatingComponent;
