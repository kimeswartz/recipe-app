
import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import CategorySearch from "./components/CategorySearch";

function App() {

  return (
    <>
      <div className="card">
          <UploadRecipeComponent />
          <DataDisplay />
          <CategorySearch />
        </div>

    </>
  )
}

export default App
