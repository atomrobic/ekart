import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StyleHub from "./pages/StyleHub";
import Description from "./pages/Description"; // import your product detail page
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/Landing"; // Import the landing page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<StyleHub />} />
        <Route path="/product/:id" element={<Description />} />  {/* <-- add this */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<LandingPage />} /> {/* Default route */}

      </Routes>
    </Router>
  );
};

export default App;
