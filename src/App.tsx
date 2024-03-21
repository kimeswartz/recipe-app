import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";
import RecipesByCategory from "./components/RecipesByCategory";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />}/>
          <Route path="/category/:categoryName" element={<RecipesByCategory />}/>
          <Route path="/testSite" element={<OldHomepage />} />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/adminpage" element={<AdminPage />}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
