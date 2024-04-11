import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import "../../styling/CardsStyle.css";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import CategorySuggestion from "./CategorySuggestion";

const RecipesByCategory = () => {
  const { categoryName } = useParams(); // Accessing the category name parameter from the route URL
  const navigate = useNavigate();
  const { categoryRecipeList, setOneRecipe, fetchOneCategory } = globalRecipeFunctions();

  //Fetches recipies from the category when categoryName changes
  useEffect(() => {
    if (categoryName) {
      fetchOneCategory(categoryName);
    }
  }, [categoryName]);

  // Function to handle a click on a specific recipe
  const handleRecipeClick = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`); // Navigating to the recipe page with the selected recipe id
    window.scrollTo(0,0);
  };

  return (
    <div>
      <div className="category-conatiner">
        <CategorySuggestion />

        <section className="standard-container">
        <h1>{categoryName} recipes</h1>
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
        </section>
      </div>
    </div>
  );
};

export default RecipesByCategory;
