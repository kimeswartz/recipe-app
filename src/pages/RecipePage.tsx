import CategorySuggestion from "../components/recipe_components/CategorySuggestion";
import DisplayRecipes from "../components/recipe_components/DisplayAllRecipe";
import TopRatedRecipes from "../components/recipe_components/TopRatedRecipe";

const RecipePageContent = () => {
  return (
    <div>
      <div className="spacer-container">
        <h1>Trending Recipes</h1>
      </div>
      <TopRatedRecipes />
      <div className="category-conatiner">
        <h1>Our Most Beloved Categories</h1>
        <CategorySuggestion />
      </div>
      <h1>Everything Else</h1>
      <DisplayRecipes />
    </div>
  );
};

export default RecipePageContent;
