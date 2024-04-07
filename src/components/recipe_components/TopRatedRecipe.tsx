import { useEffect } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { useNavigate } from "react-router-dom";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import "../../styling/CardsStyle.css";

const TopRatedRecipes = () => {
  const { recipeList, fetchAllRecipes, setOneRecipe } = globalRecipeFunctions();
  const navigate = useNavigate();

  // Fetch all recipes when component first loads or recipeList changes
  useEffect(() => {
    fetchAllRecipes();
  }, []);

  // Function to handle navigation to individual recipe page
  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="card-grid">
      <h2>Top Rated Recipes</h2>
      {recipeList
        .filter(
          (recipe) => recipe.avgRating !== undefined && recipe.avgRating >= 3
        )
        .sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
        .map((recipe) => (
          <div
            key={recipe._id}
            className="recipe-card"
            onClick={() => handleNavigate(recipe)}
          >
            <div className="first-card-div">
              {" "}
              {/* Image container */}
              <img
                className="display-recipe-img"
                src={recipe.imageUrl}
                alt={recipe.title}
              />
              <b className="card-category">
                {recipe.avgRating?.toFixed(1) || "No rating"}
              </b>
            </div>
            <div className="second-card-div">
              {" "}
              {/* Content below the image */}
              <h3>{recipe.title}</h3>
            </div>
          </div>
        ))}
    </div>
  );
};

export default TopRatedRecipes;
