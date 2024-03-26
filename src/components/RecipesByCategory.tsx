import { useNavigate, useParams } from "react-router-dom";
import "../styling/RecipiesByCategoryStyle.css";
import allRecipeState from "../state/Endpoints";
import { RecipeInterface } from "../interfaces/RecipeInterface";

const RecipesByCategory = () => {
  const { categoryName } = useParams(); // Accessing the category name parameter from the route URL
  const navigate = useNavigate();
  const { categoryRecipeList, setOneRecipe } = allRecipeState();

  // Function to handle a click on a specific recipe
  const handleRecipeClick = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`); // Navigating to the recipe page with the selected recipe id
  };

  return (
    <div className="recipeContainer">
      <h1>{categoryName} recept</h1>
      <div className="recipeList">
        {categoryRecipeList.map((recipe) => (
          <div
            key={recipe._id}
            className="recipeItem"
            onClick={() => handleRecipeClick(recipe)}
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
