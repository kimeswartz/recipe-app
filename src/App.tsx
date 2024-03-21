import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";
<<<<<<< HEAD
import DisplayOneRecipe from "./components/DisplayOneRecipe";
import FilterPage from './pages/Filter';
=======

>>>>>>> 3b347b87c02b56654c99214ec2081ccb08b4231c

function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/filter" element={<FilterPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />} />
          <Route path="/recipe/:recipeId" element={<DisplayOneRecipe />} />
          <Route path="/adminpage" element={<AdminPage />}/>
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;