import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "./interfaces/RecipeInterface";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DisplayOneRecipe from "./components/DisplayOneRecipe";

function App() {

  const [recipeData, setRecipe] = useState<RecipeInterface[]>([]);


  useEffect(() => {
    const getRecipes = async () => {
      try {
        const response = await axios.get<RecipeInterface[]>("https://sti-java-grupp4-s4yjx9.reky.se/recipes");
        if (response.status === 200) {
          setRecipe(response.data);
          console.log("Success fetching data from Swagger/Recipes");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getRecipes();
  }, [])



  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          {recipeData.map((recipe) => (<Route path={`/Recipes/${recipe._id}-${encodeURIComponent(recipe.title)}`} element={<DisplayOneRecipe recipe={recipe} />} key={recipe._id} />))}
        </Routes>
      </Router>
    </>
  );
}

export default App;