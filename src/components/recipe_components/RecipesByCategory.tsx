import { useNavigate, useParams } from "react-router-dom";
import "../../styling/CardsStyle.css";
import allRecipeState from "../../store/Endpoints";
import { RecipeInterface } from "../../interfaces/RecipeInterface";

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
    <div>
      <h1>{categoryName} recept</h1>
      <div className="card-grid">
        {categoryRecipeList.map((recipe) => (
          <div
            className="recipe-card"
            key={recipe._id}
            onClick={() => handleRecipeClick(recipe)}
          >
            <div className="first-card-div">
              {/* Image container */}
              <img
                className="display-recipe-img"
                src={recipe.imageUrl}
                alt={recipe.title}
              />
              <b className="card-category">{recipe.categories[0]}</b>
            </div>
            <div className="second-card-div">
              {/* Assuming you want to display category as a badge */}
              <h3>{recipe.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesByCategory;
