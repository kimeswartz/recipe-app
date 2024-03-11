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
<<<<<<< HEAD

=======
>>>>>>> 0166bf65889e8806b8a5153c3cf6ed75832e484c
    </>
  );
}

export default App;
