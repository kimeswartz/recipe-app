//Hampus + Alice

import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { RecipeInterface } from "../../interfaces/recipe_interfaces/RecipeInterface";
import CategorySuggestion from "./CategorySuggestion";
import "../../styling/Cards.css";

const RecipesByCategory = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { categoryRecipeList, setOneRecipe, fetchOneCategory } = globalRecipeFunctions();

  useEffect(() => {
    if (categoryName) {
      fetchOneCategory(categoryName);
    }
  }, [categoryName]);

  const handleRecipeClick = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0, 0);
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
                  <img
                    className="display-recipe-img"
                    src={recipe.imageUrl}
                    alt={recipe.title}
                  />
                  <b className="card-category">{recipe.categories[0]}</b>
                </div>
                <div className="second-card-div">
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
