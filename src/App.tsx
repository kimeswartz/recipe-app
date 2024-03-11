import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import CategorySearch from "./components/CategorySearch";
import UpdateRecipe from "./components/UpdateRecipe";

function App() {

  return (
    <>
      <div className="card">
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
        <UpdateRecipe />
        
      </div>

    </>
  );
}

export default App;
