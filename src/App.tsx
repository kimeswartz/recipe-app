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
import CocktailHomePage from "./pages/CocktailHomePage";
import IngredientPage from "./pages/IngredientPage";
import DisplayOneCocktail from "./components/cocktail_components/DisplayOneCocktail";
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const { displayCart, toggleCart } = globalCartFunctions();

  // Menu items defined
  const menuItems = [
    { title: "Home", path: "/" },
    { title: "Recipes", path: "/recipes" },
    { title: "Cocktails", path: "/cocktails" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Popular", path: "/popular" },
    { title: "Your list", path: "/cart" },
  ];

  return (
    <>
      <BrowserRouter>
        <Navbar menuItems={menuItems} />{" "}
        {/* Pass the menuItems prop to our Navbar */}
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
          <Route path="/ingredient/" element={<IngredientPage />} />
          <Route path="/cocktails" element={<CocktailHomePage />} />
          <Route path="/cocktail/:id" element={<DisplayOneCocktail />} />{" "}
          {/* arash, med hjälp från hampus */}
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
          <Route path="/cart" element={<CartComponent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
