import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Header } from "./scenes/header";
import Principal from "./scenes/body/principal";
import Home from "./pages/home";
import Login from "./pages/login";
import AsignaturasUser from "./pages/asignaturas";
import Admin from "./scenes/admin";
import Asignaturas from "./scenes/admin/components/asignaturas/Asignaturas";
import Libros from "./scenes/admin/components/libros/Libros";
import Reservas from "./scenes/admin/components/reservas/Reservas";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/asignaturas" element={<AsignaturasUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<Admin />} />
          {/* <Route path="/admin/asignaturas" element={<Asignaturas />} />
          <Route path="/admin/libros" element={<Libros />} />
          <Route path="/admin/reservas" element={<Reservas />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
