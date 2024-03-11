import { useState } from "react";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import CategorySearch from "./components/CategorySearch";
import ReviewComponent from './components/ReviewComponent';

function App() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null); 

  // Funktion för att sätta det valda receptets id
  const handleSelectRecipe = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
  };

  // Funktionen kommer att köras när ett recept väljs i DataDisplay
  const onSelectRecipe = (recipeId: string) => {
    console.log("Selected recipe:", recipeId);
    handleSelectRecipe(recipeId);
  };

  return (
    <>
      <div className="card">
        <UploadRecipeComponent />
        <DataDisplay onSelectRecipe={onSelectRecipe} />
        <CategorySearch onSelectRecipe={onSelectRecipe} /> 
        {selectedRecipeId && <ReviewComponent recipeId={selectedRecipeId} />}
      </div>
    </>
  );
}

export default App;