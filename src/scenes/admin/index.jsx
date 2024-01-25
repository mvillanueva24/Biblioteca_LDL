import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import Asignaturas from "./components/asignaturas/Asignaturas";
import Libros from "./components/libros/Libros";
import Reservas from "./components/reservas/Reservas";

import {
  LuBook,
  LuMusic,
  LuCalendarDays,
  LuCalendarClock,
} from "react-icons/lu";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entregas from "./components/entregas/Entregas.jsx";
import Entregados from "./components/entregas/Entregados.jsx";
import NoEntregados from "./components/entregas/NoEntregados.jsx";
import Devueltos from "./components/entregas/Devueltos.jsx";

function index() {
  const subMenusEntregas = [
    { text: "No entregados", icon: "LuBook", path: "no-entregado" },
    { nombre: "Entregados", icon: "LuBook", path: "entregado" },
    { nombre: "Devueltos", icon: "LuMusic", path: "devuelto" },
  ];

  return (
    <div>
      {/* <Navbar /> */}

      <div className="flex">
        <Sidebar>
          <SidebarItem
            icon={<LuMusic size={27} />}
            text="Asignaturas"
            path="/admin/asignaturas"
          />
          <SidebarItem
            icon={<LuBook size={27} />}
            text="Libros"
            path="/admin/libros"
          />
          <SidebarItem
            icon={<LuCalendarClock size={27} />}
            text="Reservas"
            path="/admin/reservas"
          />
          <SidebarItem
            icon={<LuCalendarDays size={27} />}
            text="Entregas"
            name="entregas"
            items={[
              {
                text: "Entregado",
                path: "entregas/entregado",
                icon: "LuBookOpen",
              },
              {
                text: "No Entregado",
                path: "entregas/no-entregado",
                icon: "LuCalendarX ",
              },
              {
                text: "Devuelto",
                path: "entregas/devuelto",
                icon: "LuBookOpenCheck",
              },
            ]}
          />
        </Sidebar>
        <div className="w-full p-10 px-24">
          <Routes>
            <Route path="asignaturas" element={<Asignaturas />} />
            <Route path="libros" element={<Libros />} />
            <Route path="reservas" element={<Reservas />} />
            <Route path="entregas" element={<Entregas />} />
            <Route path="entregas/entregado" element={<Entregados />} />
            <Route path="entregas/no-entregado" element={<NoEntregados />} />
            <Route path="entregas/devuelto" element={<Devueltos />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default index;
