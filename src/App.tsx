import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import RecipesByCategory from "./components/RecipesByCategory";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import RecipePageContent from "./pages/RecipePage";
import FilterPage from "./pages/Filter";
import CocktailHomePage from "./pages/CocktailPages/CocktailHomePage";
import CocktailLetterPage from "./components/CocktailComponents/CocktailLetterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/cocktails/:letter" element={<CocktailLetterPage />} />
          <Route path="/cocktails" element={<CocktailHomePage />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<RecipesByCategory />}/>
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/categorypage" element={<CategoryPage />} />
          <Route path="/adminpage" element={<AdminPage />}/>
          <Route path="/recipes" element={<RecipePageContent />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;