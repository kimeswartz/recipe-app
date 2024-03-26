import { useEffect } from "react";
import allRecipeState from "../state/Endpoints";
import { useNavigate } from "react-router-dom";
import { RecipeInterface } from "../interfaces/RecipeInterface";

//Same styling file as recipesByCategory
import "../styling/RecipiesByCategoryStyle.css";

const TopRatedRecipes = () => {
  const { recipeList, fetchAllRecipes, setOneRecipe } = allRecipeState();
  const navigate = useNavigate();

  // Fetch all recipes when component first loads or recipeList changes
  useEffect(() => {
    fetchAllRecipes();
  }, [recipeList]);

  // Function to handle navigation to individual recipe page
  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0, 0);
  };

  //Filter for recipes with rating 3 or over
  //Sort to display scores high to low
  return (
    <div className="recipeContainer">
      <h2>Top Rated Recipes</h2>
      <div className="recipeList">
        {recipeList
          .filter(
            (recipe) => recipe.avgRating !== undefined && recipe.avgRating >= 3
          )
          .sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
          .map((recipe) => (
            <div
              key={recipe._id}
              className="recipeItem"
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
          ))}
      </div>
    </div>
  );
};

export default TopRatedRecipes;
