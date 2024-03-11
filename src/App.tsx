import { useState } from "react";
import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
          <RecipeSearch/>
          <UploadRecipeComponent />
          <DataDisplay />
        </div>

    </>
  )
}

export default App
