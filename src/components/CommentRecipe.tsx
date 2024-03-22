//Arash

import React, { useState } from "react";
import axios from "axios";
import { CommentInterface } from "../interfaces/CommentInterface";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const CommentComponent: React.FC = () => {
  const [recipeTitle, setRecipeTitle] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const findRecipeByTitle = async (
    title: string
  ): Promise<RecipeInterface | undefined> => {
    try {
      const response = await axios.get<RecipeInterface[]>(
        "https://sti-java-grupp4-s4yjx9.reky.se/recipes"
      );
      const recipes = response.data;
      return recipes.find(
        (recipe) => recipe.title.toLowerCase() === title.toLowerCase()
      );
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
        const newComment: CommentInterface = {
          text: comment,
        };
        const response = await axios.post(
          `https://sti-java-grupp4-s4yjx9.reky.se/recipes/${recipe._id}/comments`,
          newComment
        );
        if (response.status === 200) {
          setSubmitMessage("Kommentaren har skickats framgångsrikt");
        } else {
          setSubmitMessage("Något gick fel vid skickande av kommentaren");
        }
      } else {
        setSubmitMessage("Receptet med den angivna titeln hittades inte");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      setSubmitMessage("Något gick fel vid skickande av kommentaren");
    }
  };

  return (
    <div>
      <h2>Lämna en kommentar</h2>
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
          Kommentar:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Skicka kommentar</button>
      </form>
    </div>
  );
};

export default CommentComponent;
