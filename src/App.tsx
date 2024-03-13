import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";
import CategorySearch from "./components/CategorySearch";
import DeleteRecipe from "./components/DeleteRecipe";
import RecipeSlider from "./components/RecipeSlider";

function App() {

  return (
    <>
      <div className="card">
        <RecipeSearch/>
        <RecipeSlider/>
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
        <DeleteRecipe/>
      </div>
    </>
  );
}

export default App;
