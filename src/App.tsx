import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";
import CategorySearch from "./components/CategorySearch";
import DeleteRecipe from "./components/DeleteRecipe";
import DisplayAllRecipe from "./components/DisplayAllRecipe";


function App() {
  return (
    <>
      <div className="card">
        <RecipeSearch />
        <DisplayAllRecipe />
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
        <DeleteRecipe />
        
      </div>
    </>
  );
}

export default App;
