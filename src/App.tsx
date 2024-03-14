import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import OldHomepage from "./pages/OldHomepage";
import RecipesByCategory from "./components/RecipesByCategory";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />} />
          <Route path="/Recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route
            path="/category/:categoryName"
            element={<RecipesByCategory />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
