import React, { useState } from "react";
import Logo from "../../../images/logo.png";
import { useStateContext } from "../../../contexts/ContextProvider";

export default function index() {
  const { setCurrentUser, setUserToken } = useStateContext();
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const url = import.meta.env.VITE_DOMAIN_DB;

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = {
      dni: dni,
      password: password,
    };
    console.log(data);
    await fetch(`${url}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.user);
        // Almacena el usuario en el estado
        // setUser(user);
        setCurrentUser(data.user);
        setUserToken(data.token);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div class="flex flex-col items-center justify-center h-screen px-6 py-8 mx-auto lg:py-10">
      <a
        href="#"
        class="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
      >
        <img src={Logo} alt="icono" className="w-12 h-12 mr-2" />
        Biblioteca LDL
      </a>
      <div class="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 ">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
            Ingresa a tu cuenta
          </h1>
          <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 ">
                DNI del Alumno
              </label>
              <input
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                name="dni"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bluery-600 focus:border-bluery-600 block w-full p-2.5"
                placeholder="DNI"
              />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 ">
                Contraseña
              </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bluery-600 focus:border-bluery-600 block w-full p-2.5 "
              />
            </div>

            <button
              type="submit"
              class="w-full bg-[#3386c3] hover:bg-[#236aa6] text-white focus:ring-4 focus:outline-none focus:ring-bluery-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
