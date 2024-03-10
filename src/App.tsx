import { useState } from "react";
import "./App.css";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import DeleteRecipe from "./components/DeleteRecipe";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <UploadRecipeComponent />
        <DataDisplay />
        <DeleteRecipe />
      </div>
    </>
  );
}

export default App;
