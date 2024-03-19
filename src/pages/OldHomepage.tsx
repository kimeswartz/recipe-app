import React from 'react'
import RecipeSearch from '../components/SearchRecipe'
import UploadRecipeComponent from '../components/UploadRecipe'
import DisplayAllRecipe from '../components/DisplayAllRecipe'
import UpdateRecipe from '../components/UpdateRecipe'
import ReviewComponent from '../components/ReviewComponent'
import CommentRecipe from '../components/CommentRecipe'
import CategorySuggestion from "../components/CategorySuggestion";


const OldHomepage = () => {
  return (
    <div>
        <h1>old homepage</h1>
        <RecipeSearch />
        <CategorySuggestion/>
        <UploadRecipeComponent />
        <DisplayAllRecipe />
        <ReviewComponent />
        <UpdateRecipe />
        <CommentRecipe />

    </div>
  );
};

export default OldHomepage;
