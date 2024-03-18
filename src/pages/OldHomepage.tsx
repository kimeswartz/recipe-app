import React from 'react'
import RecipeSearch from '../components/SearchRecipe'
import UploadRecipeComponent from '../components/UploadRecipe'
import DisplayAllRecipe from '../components/DisplayAllRecipe'
import UpdateRecipe from '../components/UpdateRecipe'
import ReviewComponent from '../components/ReviewComponent'
import CommentRecipe from '../components/CommentRecipe'


const OldHomepage = () => {
  return (
    <div>
        <h1>old homepage</h1>
        <RecipeSearch />
        <UploadRecipeComponent />
        <DisplayAllRecipe />
        <ReviewComponent />
        <UpdateRecipe />
        <CommentRecipe />

    </div>
  )
}

export default OldHomepage