import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";
import CategorySearch from "./components/CategorySearch";
import DeleteRecipe from "./components/DeleteRecipe";
import ReviewComponent from "./components/ReviewComponent";
import CommentComponent from "./components/CommentRecipe";

function App() {
  return (
    <>
      <div className="card">
        <RecipeSearch />
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
        <DeleteRecipe />
        <ReviewComponent /> 
        <CommentComponent />
      </div>
    </>
  );
}

export default App;