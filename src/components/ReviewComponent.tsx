import React, { useState } from "react";
import axios from "axios";
import { ReviewInterface } from "../interfaces/ReviewInterface";

interface Props {
    recipeId: string; // Id för receptet att lämna omdöme på
}

const ReviewComponent: React.FC<Props> = ({ recipeId }) => {
    const [rating, setRating] = useState<number>(0);
    const [submitMessage, setSubmitMessage] = useState<string>("");

    const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRating = parseInt(e.target.value);
        if (!isNaN(newRating)) {
            setRating(newRating);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const newReview: ReviewInterface = {
                rating: rating,
            };

            const response = await axios.post(
                `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipeId}/reviews`,
                newReview
            );

            if (response.status === 200) {
                setSubmitMessage("Omdömet har skickats framgångsrikt");
            } else if (response.status >= 300 && response.status < 400) {
                setSubmitMessage("Omdömet har omdirigerats");
            } else if (response.status >= 400 && response.status < 500) {
                setSubmitMessage("Omdömet har misslyckats på grund av klientfel");
            } else if (response.status >= 500) {
                setSubmitMessage("Omdömet har misslyckats på grund av serverfel");
            }
        } catch (error) {
            console.error("Fel vid inlämning av omdöme:", error);
            setSubmitMessage("Omdömet har misslyckats");
        }
    };

    return (
        <div>
            <h2>Lämna ett omdöme</h2>
            {submitMessage && <p>{submitMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Betyg:
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={handleRatingChange}
                    />
                </label>
                <br />
                <button type="submit">Skicka omdöme</button>
            </form>
        </div>
    );
};

export default ReviewComponent;