import React, { useState } from "react";
import axios from "axios";
import { ReviewInterface } from "../interfaces/ReviewInterface";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const ReviewComponent: React.FC = () => {
    const [recipeTitle, setRecipeTitle] = useState<string>("");
    const [rating, setRating] = useState<number>(0);
    const [submitMessage, setSubmitMessage] = useState<string>("");

    const findRecipeByTitle = async (title: string): Promise<RecipeInterface | undefined> => {
        try {
            const response = await axios.get<RecipeInterface[]>("https://sti-java-grupp4-s4yjx9.reky.se/recipes");
            const recipes = response.data;
            return recipes.find(recipe => recipe.title.toLowerCase() === title.toLowerCase());
        } catch (error) {
            console.error("Error fetching recipes:", error);
            return undefined;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        try {
            const recipe = await findRecipeByTitle(recipeTitle);
            if (recipe) {
                const newReview: ReviewInterface = {
                    rating: rating,
                };
                const response = await axios.post(
                    `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipe._id}/ratings`,
                    newReview
                );
                if (response.status === 200) {
                    setSubmitMessage("Omdömet har skickats framgångsrikt");
                } else {
                    setSubmitMessage("Något gick fel vid skickande av omdöme");
                }
            } else {
                setSubmitMessage("Receptet med den angivna titeln hittades inte");
            }
        } catch (error) {
            console.error("Error submitting review:", error);
            setSubmitMessage("Något gick fel vid skickande av omdöme");
        }
    };

    return (
        <div>
            <h2>Lämna ett omdöme</h2>
            {submitMessage && <p>{submitMessage}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Receptets titel:
                    <input
                        type="text"
                        value={recipeTitle}
                        onChange={(e) => setRecipeTitle(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Betyg:
                    <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(parseInt(e.target.value))}
                    />
                </label>
                <br />
                <button type="submit">Skicka omdöme</button>
            </form>
        </div>
    );
};

export default ReviewComponent;