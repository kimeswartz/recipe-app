import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";
import CategorySearch from "./components/CategorySearch";
import DeleteRecipe from "./components/DeleteRecipe";
<<<<<<< HEAD
import DisplayAllRecipe from "./components/DisplayAllRecipe";

=======
import ReviewComponent from "./components/ReviewComponent";
>>>>>>> 58e4320c9dfc92df2ca039a922beba607ef41727

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
<<<<<<< HEAD
        
=======
        <ReviewComponent /> 
>>>>>>> 58e4320c9dfc92df2ca039a922beba607ef41727
      </div>
    </>
  );
}

export default App;