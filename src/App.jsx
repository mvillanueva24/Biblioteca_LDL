import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Header } from "./scenes/header";
import Principal from "./scenes/body/principal";
import Home from "./pages/home";
import Login from "./pages/login";
import AsignaturasUser from "./pages/asignaturas";
import Admin from "./scenes/admin";
import Asignaturas, {
  asignaturaLoader,
} from "./scenes/admin/components/asignaturas/Asignaturas";
import Libros, { librosLoader } from "./scenes/admin/components/libros/Libros";
import Reservas, {
  reservaLoader,
} from "./scenes/admin/components/reservas/Reservas";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" index element={<Home />} />
      <Route path="asignaturas" element={<AsignaturasUser />} />
      <Route path="login" element={<Login />} />
      <Route path="admin" element={<Admin />}>
        <Route
          path="asignaturas"
          element={<Asignaturas />}
          loader={asignaturaLoader}
        />
        <Route path="libros" element={<Libros />} loader={librosLoader} />
        <Route path="reservas" element={<Reservas />} loader={reservaLoader} />
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
