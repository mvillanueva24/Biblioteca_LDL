import React from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { SidebarItem } from "./components/Sidebar";
import Asignaturas from "./components/asignaturas/Asignaturas";
import Libros from "./components/libros/Libros";
import Reservas from "./components/reservas/Reservas";

import { LuBook, LuMusic, LuCalendarDays } from "react-icons/lu";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function index() {
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
            icon={<LuCalendarDays size={27} />}
            text="Reservas"
            path="/admin/reservas"
          />
          <SidebarItem icon={<LuBook size={27} />} text="ALEATORIO" />
        </Sidebar>
        <div className="w-full p-10 px-24">
          <Routes>
            <Route path="asignaturas" element={<Asignaturas />} />
            <Route path="libros" element={<Libros />} />
            <Route path="reservas" element={<Reservas />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default index;
