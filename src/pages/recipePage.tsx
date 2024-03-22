import DisplayRecipes from "../components/DisplayAllRecipe";

const RecipePageContent = () => {
  return (
    <div>

      <h1>This page shows all recipes</h1>

    <p>Below you can see all recipes</p>

      <div className="card">

        <DisplayRecipes />

      </div>

    </div>
  );
};

export default RecipePageContent
