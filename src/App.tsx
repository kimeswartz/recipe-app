import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import OldHomepage from "./pages/OldHomepage";
import AdminPage from "./pages/AdminPage";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/testSite" element={<OldHomepage />}/>
          <Route path="/adminpage" element={<AdminPage />}/> /* BARA FÖR ATT TESTA MIN AdminPage */
        </Routes>
      </Router>
    </>
  );
}

export default App;