import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";
import RecipesByCategory from "./components/RecipesByCategory";
import PopularRecipes from "./pages/PopularRecipes";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />}/>
          <Route path="/category/:categoryName" element={<RecipesByCategory />}/>
          <Route path= "/popularRecipes" element={<PopularRecipes/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
