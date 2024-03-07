
import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
<<<<<<< HEAD
=======
import CategorySearch from "./components/CategorySearch";
import RecipeSearch from "./components/FindRecipe";
>>>>>>> d32348786b9b46f70a540931719b7d303ebdf41a

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
<<<<<<< HEAD

=======
        <RecipeSearch />
>>>>>>> d32348786b9b46f70a540931719b7d303ebdf41a
          <UploadRecipeComponent />
          <DataDisplay />
        </div>

    </>
  );
}

export default App;
