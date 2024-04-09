import CategorySuggestion from "../components/recipe_components/CategorySuggestion";
import DisplayRecipes from "../components/recipe_components/DisplayAllRecipe";

const RecipePageContent = () => {
  return (
    <div>
      <div className="spacer-container">
      <h1>All our recipes</h1>
      </div>
      <div className="category-conatiner">
        <CategorySuggestion />
      </div>
      <DisplayRecipes />
    </div>
  );
};

export default RecipePageContent;
