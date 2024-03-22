import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";
import RecipesByCategory from "./components/RecipesByCategory";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import FilterPage from "./pages/Filter";
=======
import CategoryPage from "./pages/CategoryPage";

>>>>>>> b510a78f67d32f07beafdb65bcf1c8e72a6b39a2

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<RecipesByCategory />}/>
          <Route path="/testSite" element={<OldHomepage />} />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/adminpage" element={<AdminPage />}/>
          <Route path="/category" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
