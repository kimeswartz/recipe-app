import { useEffect, useState } from "react";
import globalRecipeFunctions from "../../store/RecipeAPICalls";
import { useNavigate } from "react-router-dom";
import { RecipeInterface } from "../../interfaces/RecipeInterface";
import "../../styling/CardsStyle.css";

const TopRatedRecipes = () => {
  const { recipeList, setOneRecipe } = globalRecipeFunctions();
  const navigate = useNavigate();
  const [displayedRecipes, setDisplayedRecipes] = useState<RecipeInterface[]>(
    []
  );

  const handleNavigate = (recipe: RecipeInterface) => {
    setOneRecipe(recipe);
    navigate(`/recipe/${recipe._id}`);
    window.scrollTo(0, 0);
  };

  // Load maximum 4 top-rated recipes
  useEffect(() => {
    const filteredSortedRecipes = recipeList
      .filter(
        (recipe) => recipe.avgRating !== undefined && recipe.avgRating >= 4
      )
      .sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0))
      .slice(0, 4); // Only include the first 4 recipes
    setDisplayedRecipes(filteredSortedRecipes);
  }, [recipeList]);

  return (
    <section className="standard-container green-background">
      <h2>Trending recipes</h2>
      <div className="card-grid">
        {displayedRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="recipe-card"
            onClick={() => handleNavigate(recipe)}
          >
            <div className="first-card-div">
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
              <h3>{recipe.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopRatedRecipes;
