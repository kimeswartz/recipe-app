import allRecipeState from "../../store/Endpoints";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../styling/RatingComponent.css";


const RatingComponent = () => {

    const { oneRecipe, addRating } = allRecipeState();
    const [userRating, setUserRating] = useState<number>();
    const [trigger, setTrigger] = useState(false);

    // This will send a review to database between 1-5
    const handleRatingChange = async (rating: number) => {
        addRating(rating, oneRecipe._id).then(() => {
          setTrigger(!trigger);
        });
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
                      <span>Missing grade</span>
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
              </div>
  )
}

export default RatingComponent