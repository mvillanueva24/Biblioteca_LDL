import React from "react";
import Logo from "../../../images/logo.png";
export default function index() {
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
          <form class="space-y-4 md:space-y-6" action="#">
            <div>
              <label
                for="email"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Código de Alumno
              </label>
              <input
                type="email"
                name="email"
                id="email"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bluery-600 focus:border-bluery-600 block w-full p-2.5   "
                placeholder="Alumno1"
                required=""
              />
            </div>
            <div>
              <label
                for="password"
                class="block mb-2 text-sm font-medium text-gray-900 "
              >
                Contraseña
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-bluery-600 focus:border-bluery-600 block w-full p-2.5 "
                required=""
              />
            </div>

            <button
              type="submit"
              class="w-full bg-[#3386c3] hover:bg-[#236aa6] text-white focus:ring-4 focus:outline-none focus:ring-bluery-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
