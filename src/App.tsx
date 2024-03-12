
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DisplayRecipes from "./components/DisplayRecipes";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import RecipePageContent from "./pages/recipePage";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/" element={<DisplayRecipes />} />
        <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
        <Route path="/recipePage" element={<RecipePageContent />} />
      </Routes>
    </Router>
  );
}

export default App;


