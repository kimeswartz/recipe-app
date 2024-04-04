import CategorySuggestion from "../components/recipe_components/CategorySuggestion";
import DisplayRecipes from "../components/recipe_components/DisplayAllRecipe";
import HeaderRecipes from "../components/HeaderRecipe";

const RecipePageContent = () => {
  return (
    <div>
      <HeaderRecipes />

      <div className="category-conatiner">
        <CategorySuggestion />
      </div>

      <h2>All our recipes</h2>

      <DisplayRecipes />
    </div>
  );
};

export default RecipePageContent;
