
import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import CategorySearch from "./components/CategorySearch";
import RecipeSearch from "./components/FindRecipe";

function App() {

  return (
    <>
      <div className="card">
        <RecipeSearch />
          <UploadRecipeComponent />
          <DataDisplay />
          <CategorySearch />
        </div>

    </>
  )
}

export default App
