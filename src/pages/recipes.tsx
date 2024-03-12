import DisplayOneRecipe from "../components/DisplayOneRecipe";

const RecipePageContent = () => {
  return (
    <div>

      <h1>This page show one recipe</h1>
    <p>This paragraph is supposed to be seen on this page</p>
      <div className="card">

        <DisplayOneRecipe />

      </div>

    </div>
  );
};

export default RecipePageContent