//Hampus + Kim

import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { useNavigate, useLocation } from "react-router-dom";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import "../../styling/CardsStyle.css";

const DisplayRecipes = () => {
  const { recipeList, setOneRecipe, deleteRecipe } = globalRecipeFunctions();

  const location = useLocation();
  const navigate = useNavigate();

  const handleDelete = async (recipeId: string | undefined) => {
    if (recipeId) {
      deleteRecipe(recipeId)
    }
  };

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section className="standard-container">
      <h2>All recipes</h2>
        <div className="card-grid">
          {recipeList.map((recipe) => (
            <div
              className="recipe-card"
              key={recipe._id}
              onClick={() => handleNavigate(recipe)}
            >
              <div className="first-card-div">
                <img
                  className="display-recipe-img"
                  src={recipe.imageUrl}
                  alt={recipe.title}
                />

                <b className="card-category">{recipe.categories[0]}</b>
              </div>
              <div className="second-card-div">
                <h3>{recipe.title}</h3>
                {recipe.avgRating === null ? (
                  <p>0/5</p>
                ) : (
                  <p>{recipe.avgRating?.toFixed(1)}/5</p>
                )}
              </div>

              {location.pathname === "/AdminPage" && (
                <button
                  onClick={(deleteRecipe) => {
                    deleteRecipe.stopPropagation(); // Prevents the navigate action when clicking the button
                    handleDelete(recipe._id);
                    alert("Recipe is deleted from the database");
                  }}
                  className="delete-button"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default DisplayRecipes;
