import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";

import DisplayOneRecipe from "./components/DisplayOneRecipe";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />}/>
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;