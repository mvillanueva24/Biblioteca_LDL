import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Header } from "./scenes/header";
import Principal from "./scenes/body/principal";
import Home from "./pages/home";
import Login from "./pages/login";
import Asignaturas from "./pages/asignaturas";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asignaturas" element={<Asignaturas />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
