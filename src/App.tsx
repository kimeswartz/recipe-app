import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import OldHomepage from "./pages/OldHomepage";
import Navbar from "./components/Navbar";
import SearchRecipe from "./components/SearchRecipe";
import DisplayAllRecipe from "./components/DisplayAllRecipe";

function App() {

  return (
    <>
      <Router>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />}/>
          <Route path="/Recipe/:recipeId" element={<DisplayOneRecipe />}/>
          <Route path="/search" element={<SearchRecipe />}/>
          <Route path="/recipes" element={<DisplayAllRecipe/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;