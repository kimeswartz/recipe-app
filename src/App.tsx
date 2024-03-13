import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { RecipeInterface } from "./interfaces/RecipeInterface";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import DataDisplay from "./components/DisplayRecipes";
import UploadRecipeComponent from "./components/UploadRecipe";
import RecipeSearch from "./components/SearchRecipe";
import CategorySearch from "./components/CategorySearch";
import UpdateRecipe from "./components/UpdateRecipe";
import DeleteRecipe from "./components/DeleteRecipe";
import ReviewComponent from "./components/ReviewComponent";

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
          {recipeData.map((recipe) => (<Route path={`/Recipes/:recipeName/:recipe_Id`} element={<DisplayOneRecipe recipe={recipe} />} key={recipe._id} />))}
        </Routes>
      </Router>
    </>
  );
}

export default App;