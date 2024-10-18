import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Details from "./pages/Details";
import "./App.css";

function App() {
  return (
    <div>
      <div
        style={{ backgroundColor: "#FFFFF2" }}
        className="font-poppins min-h-screen p-6 text-gray-200 text-lg"
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
