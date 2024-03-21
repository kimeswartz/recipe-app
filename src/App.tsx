import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";

import DisplayOneRecipe from "./components/DisplayOneRecipe";
import Navbar from "./components/Navbar";

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />} />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;