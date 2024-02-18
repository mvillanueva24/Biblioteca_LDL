import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { Header } from "./scenes/header";
import Principal from "./scenes/body/principal";
import Home from "./pages/home";
import Login from "./pages/login";
import AsignaturasUser from "./pages/asignaturas";
import Admin from "./scenes/admin";
import { useStateContext } from "./contexts/ContextProvider";
import { Navigate } from "react-router-dom";
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
import Entregados, {
  entregadosLoader,
} from "./scenes/admin/components/entregas/Entregados";
import NoEntregados, {
  noEntregadosLoader,
} from "./scenes/admin/components/entregas/NoEntregados";
import Devueltos, {
  devueltosLoader,
} from "./scenes/admin/components/entregas/Devueltos";
import Entregas from "./scenes/admin/components/entregas/Entregas";

const ProtectedRoute = ({ children }) => {
  const { currentUser, userToken } = useStateContext();

  if (!userToken) {
    return <Navigate to="/login" replace={true} />; // Redirigir al login si no hay token
  }
  // if (currentUser.rol != "Admin") {
  //   return <Navigate to="/login" replace={true} />; // Redirigir al login si no hay token
  // }

  return children; // Permitir acceso si hay token
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" index element={<Home />} />
      <Route path="asignaturas" element={<AsignaturasUser />} />
      <Route path="login" element={<Login />} />
      <Route
        path="admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route
          path="asignaturas"
          element={<Asignaturas />}
          loader={asignaturaLoader}
        />
        <Route path="libros" element={<Libros />} loader={librosLoader} />
        <Route path="reservas" element={<Reservas />} loader={reservaLoader} />
        <Route path="entregas" element={<Entregas />}>
          <Route
            path="no-entregado"
            element={<NoEntregados />}
            loader={noEntregadosLoader}
          />

          <Route
            path="entregado"
            element={<Entregados />}
            loader={entregadosLoader}
          />
          <Route
            path="devuelto"
            element={<Devueltos />}
            loader={devueltosLoader}
          />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
