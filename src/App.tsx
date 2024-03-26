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
import Modal from 'react-modal';
import globalCartFunctions from "./state/Cart";
import CartComponent from "./components/CartComponent";

Modal.setAppElement('#root')

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
          <CartComponent />
        </Modal>
        <Routes>
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<RecipesByCategory />} />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/categorypage" element={<CategoryPage />} />
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="/recipes" element={<RecipePageContent />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;