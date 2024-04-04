import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import RecipesByCategory from "./components/recipe_components/RecipesByCategory";
import DisplayOneRecipe from "./components/recipe_components/DisplayOneRecipe";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RecipePageContent from "./pages/RecipePage";
import FilterPage from "./pages/FilterPage";
import Modal from "react-modal";
import globalCartFunctions from "./store/Cart";
import CartComponent from "./components/CartComponent";
import PopularRecipes from "./pages/PopularRecipesPage";
import AboutUsPage from "./pages/AboutUsPage";
import CocktailLetterPage from "./components/cocktail_components/CocktailLetter";
import CocktailHomePage from "./pages/CocktailHomePage";
import DisplayOneCocktail from "./components/cocktail_components/DisplayOneCocktail";

Modal.setAppElement("#root");

function App() {
  const { displayCart, toggleCart } = globalCartFunctions();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Modal
          className="modal-cart-window"
          isOpen={displayCart}
          onRequestClose={() => toggleCart(displayCart)}
          contentLabel="Example Modal"
        >
          <div>
            <nav className="navbar">
              <h2>Shopping List</h2>
              <button
                className="main-button"
                onClick={() => toggleCart(displayCart)}
              >
                X
              </button>
            </nav>
            <CartComponent />
          </div>
        </Modal>
        <Routes>
          <Route path="/cocktails/:letter" element={<CocktailLetterPage />} />
          <Route path="/cocktails" element={<CocktailHomePage />} />
          <Route path="/cocktail/:id" element={<DisplayOneCocktail />} /> {/* arash, med hjälp från hampus */}
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/category/:categoryName"
            element={<RecipesByCategory />}
          />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/recipes" element={<RecipePageContent />} />
          <Route path="/popular" element={<PopularRecipes />} />
          <Route path="/about" element={<AboutUsPage />} />
        
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
