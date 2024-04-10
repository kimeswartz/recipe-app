import CategorySuggestion from "../components/recipe_components/CategorySuggestion";
import DisplayRecipes from "../components/recipe_components/DisplayAllRecipe";
import TopRatedRecipes from "../components/recipe_components/TopRatedRecipe";

const RecipePageContent = () => {
  return (
    <>
      <h1>Our Recipes</h1>

      <div className="spacer-container">
        <CategorySuggestion />
      </div>

      <div className="spacer-container">
        <h2>Trending recipes</h2>
        <TopRatedRecipes />
      </div>

      <div className="spacer-container">
        <h2>All our recipes</h2>
        <DisplayRecipes />
      </div>
    </>
  );
};

export default RecipePageContent;
