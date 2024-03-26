
import { useEffect} from "react";
import allRecipeState from '../state/Endpoints';
import { useNavigate } from "react-router-dom";

import "../styling/RecipiesByCategoryStyle.css"
import { RecipeInterface } from "../interfaces/RecipeInterface";

const TopRatedRecipes = () => {
  
    const {recipeList, fetchAllRecipes, setOneRecipe} = allRecipeState();
    const navigate = useNavigate();

  useEffect(() => {
    fetchAllRecipes();
    }, [recipeList]);

  
  const filteredRecipes = recipeList.filter((recipe) => recipe.avgRating !== undefined && recipe.avgRating >= 3);


const handleNavigate = (recipe: RecipeInterface) => {
  setOneRecipe(recipe)
  navigate(`/recipe/${recipe._id}`)
  window.scrollTo(0,0)
}

// //   Function to handle a click on a specific recipe
// //   const handleRecipeClick = (recipeId: string) => {
// //     navigate(`/Recipe/${recipeId}`); // Navigating to the recipe page with the selected recipe id
// //   };

  return (
    <div className="recipeContainer">
      <h2>Top Rated Recipes</h2>
      <div className="recipeList">
        {filteredRecipes
          .sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
          .map((recipe) => (
            <div
            key={recipe._id}
            className="recipeItem"
            // onClick={() => handleRecipeClick(recipe._id)}
            onClick={() => handleNavigate(recipe)}
          >
                <div className="imgContainer">
                  <img src={recipe.imageUrl} alt={recipe.title} />
                </div>
                <div className="textContainer">
                  <h2>
                    {recipe.title}, {recipe.avgRating}
                  </h2>
                </div>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default TopRatedRecipes;
