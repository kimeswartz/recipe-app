import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import RecipesByCategory from "./components/recipe_components/RecipesByCategory";
import DisplayOneRecipe from "./components/recipe_components/DisplayOneRecipe";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipePageContent from "./pages/RecipePage";
import FilterPage from "./pages/RecipeFilterPage";
import AboutUsPage from "./pages/AboutUsPage";
import CocktailHomePage from "./pages/CocktailHomePage";
import IngredientPage from "./pages/CocktailIngredientPage";
import CartPage from "./pages/CartPage";
import DisplayOneCocktail from "./components/cocktail_components/DisplayOneCocktail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/ingredient/:ingredientId"
            element={<IngredientPage />}
          />
          <Route path="/cocktails" element={<CocktailHomePage />} />
          <Route path="/cocktail/:id" element={<DisplayOneCocktail />} />{" "}
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:categoryName"
            element={<RecipesByCategory />}
          />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/recipes" element={<RecipePageContent />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/your-list" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
