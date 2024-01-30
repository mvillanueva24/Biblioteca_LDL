import React from "react";
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
import { Outlet, useNavigation } from "react-router-dom";

import { RotatingLines } from "react-loader-spinner";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Entregas from "./components/entregas/Entregas.jsx";
import Entregados from "./components/entregas/Entregados.jsx";
import NoEntregados from "./components/entregas/NoEntregados.jsx";
import Devueltos from "./components/entregas/Devueltos.jsx";

export const reservaLoader = async () => {
  const response = await fetch(`${domain_url}/api/reservas`);
  const data = await response.json();
  return data;
};

function index() {
  const domain_url = import.meta.env.VITE_DOMAIN_DB;
  const subMenusEntregas = [
    { text: "No entregados", icon: "LuBook", path: "no-entregado" },
    { nombre: "Entregados", icon: "LuBook", path: "entregado" },
    { nombre: "Devueltos", icon: "LuMusic", path: "devuelto" },
  ];

  const { state } = useNavigation();

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
            path={null}
            items={[
              {
                text: "No Entregado",
                path: "entregas/no-entregado",
                icon: "LuCalendarX",
              },
              {
                text: "Entregado",
                path: "entregas/entregado",
                icon: "LuBookOpen",
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
          {state == "loading" ? (
            <div className="h-full flex content-center justify-center">
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default index;
