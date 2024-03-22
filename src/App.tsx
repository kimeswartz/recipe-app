import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import RecipesByCategory from "./components/RecipesByCategory";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<RecipesByCategory />}/>
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/categorypage" element={<CategoryPage />} />
          <Route path="/adminpage" element={<AdminPage />}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
