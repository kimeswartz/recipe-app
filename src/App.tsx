import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import CategorySearch from "./components/CategorySearch";
import DeleteRecipe from "./components/DeleteRecipe";

function App() {
  return (
    <>
      <div className="card">
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
        <DeleteRecipe />
      </div>
    </>
  );
}

export default App;
