import CategorySuggestion from "../components/recipe_components/CategorySuggestion";
import DisplayRecipes from "../components/recipe_components/DisplayAllRecipe";
import TopRatedRecipes from "../components/recipe_components/TopRatedRecipe";

const RecipePageContent = () => {
  return (
    <>
      <h1>Our Recipes</h1>

      <CategorySuggestion />

      <h2>Trending recipes</h2>
      <TopRatedRecipes />

      <h2>All our recipes</h2>
      <DisplayRecipes />
    </>
  );
};

export default RecipePageContent;
