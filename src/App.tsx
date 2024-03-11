import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
<<<<<<< HEAD
import RecipeSearch from "./components/SearchRecipe";
=======
import CategorySearch from "./components/CategorySearch";
<<<<<<< HEAD
import DeleteRecipe from "./components/DeleteRecipe";
=======
>>>>>>> 1726100fbadd742e2af492eec761eeaab1585839
>>>>>>> 6899482afaf7d8daee4374ad4c76012a334e8707

function App() {
  return (
    <>
      <div className="card">
<<<<<<< HEAD
          <RecipeSearch/>
          <UploadRecipeComponent />
          <DataDisplay />
        </div>
=======
        <UploadRecipeComponent />
        <DataDisplay />
        <CategorySearch />
        <DeleteRecipe />
      </div>
<<<<<<< HEAD
=======
>>>>>>> 1726100fbadd742e2af492eec761eeaab1585839

>>>>>>> 6899482afaf7d8daee4374ad4c76012a334e8707
    </>
  );
}

export default App;
