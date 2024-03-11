import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
<<<<<<< HEAD
import RecipeSearch from "./components/SearchRecipe";
=======
import CategorySearch from "./components/CategorySearch";
>>>>>>> 1726100fbadd742e2af492eec761eeaab1585839

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
      </div>
>>>>>>> 1726100fbadd742e2af492eec761eeaab1585839

    </>
  );
}

export default App;
