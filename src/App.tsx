import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<RecipesByCategory />}/>
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
