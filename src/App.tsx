import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";
import CategorySearch from "./components/CategorySearch";
import UpdateRecipe from "./components/UpdateRecipe";
import DeleteRecipe from "./components/DeleteRecipe";
import RecipeSlider from "./components/RecipeSlider";
import ReviewComponent from "./components/ReviewComponent";

function App() {

  return (
    <>
      <div className="card">
        <RecipeSearch/>
        <RecipeSlider/>
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
        <DeleteRecipe />
        <ReviewComponent />
        <UpdateRecipe /> 
      </div>
    </>
  );
}

export default App;