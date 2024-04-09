import DisplayOneRecipe from "../components/recipe_components/DisplayOneRecipe";

const OneRecipePageContent = () => {
  return (
    <div>
      <h1>This page shows just one recipe</h1>
      <p>Below you can see the recipes</p>

      <div className="card">
        <DisplayOneRecipe />
      </div>
    </div>
  );
};

export default OneRecipePageContent;
