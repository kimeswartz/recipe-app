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
<<<<<<< HEAD
import CocktailHomePage from "./pages/CocktailPages/CocktailHomePage";
import CocktailLetterPage from "./components/CocktailComponents/CocktailLetterPage";
=======
import Modal from 'react-modal';
import globalCartFunctions from "./state/Cart";
import CartComponent from "./components/CartComponent";
import PopularRecipes from "./pages/PopularRecipes";

Modal.setAppElement('#root')
>>>>>>> fd7e73334ba97bea0400f2608c8dbffc56739b23

function App() {

  const { displayCart, toggleCart } = globalCartFunctions();

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Modal
          className='modal-cart-window'
          isOpen={displayCart}
          onRequestClose={() => toggleCart(displayCart)}
          contentLabel="Example Modal"
        >
          <div>
            <div className="navbar">
              <h2>Varukorg</h2>
              <button className="main-button" onClick={() => toggleCart(displayCart)}>X</button>
            </div>
            <CartComponent />
          </div>
        </Modal>
        <Routes>
          <Route path="/cocktails/:letter" element={<CocktailLetterPage />} />
          <Route path="/cocktails" element={<CocktailHomePage />} />
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<RecipesByCategory />} />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/categorypage" element={<CategoryPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/recipes" element={<RecipePageContent />} />
          <Route path="/popular" element={<PopularRecipes />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;