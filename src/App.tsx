import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;