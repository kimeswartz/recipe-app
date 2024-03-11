import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";
import CategorySearch from "./components/CategorySearch";

function App() {

  return (
    <>
      <div className="card">
        <RecipeSearch/>
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
      </div>

    </>
  );
}

export default App;
