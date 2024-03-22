import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styling/RecipiesByCategoryStyle.css";
import allRecipeState from "../state/Endpoints";

const RecipesByCategory = () => {
  const { categoryName } = useParams(); // Accessing the category name parameter from the route URL
  const navigate = useNavigate();
  const { recipeList, fetchOneCategory } = allRecipeState();

  // To fetch all recipies from specific category when component first loads or when the categoryName changes
  useEffect(() => {
    if (categoryName) {
      fetchOneCategory(categoryName);
    }
  }, [categoryName]);

  // Function to handle a click on a specific recipe
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/Recipe/${recipeId}`); // Navigating to the recipe page with the selected recipe id
  };

  return (
    <div className="recipeContainer">
      <h1>Recipes in category: {categoryName}</h1>
      <div className="recipeList">
        {recipeList.map((recipe) => (
          <div
            key={recipe._id}
            className="recipeItem"
            onClick={() => handleRecipeClick(recipe._id)}
          >
            <div className="imgContainer">
              <img src={recipe.imageUrl} alt={recipe.title} />
            </div>
            <div className="textContainer">
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesByCategory;
