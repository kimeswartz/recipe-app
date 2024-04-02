import CategorySuggestion from "../components/CategorySuggestion";
import DisplayRecipes from "../components/DisplayAllRecipe";
import HeaderRecipes from "../components/Headers/HeaderRecipes";


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

export default RecipePageContent
