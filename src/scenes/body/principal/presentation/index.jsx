import React from "react";
import PresentLogo from "../../../../images/logo-titulo-2.png";

export default function index() {
  return (
    <div className="flex flex-col items-center justify-center">
      <img
        src={PresentLogo}
        alt="logo-principal"
        className="w-11/12 md:w-3/5"
      />

      <form action="" className="mt-10 w-11/12 md:w-10/12">
        {/* Ajustar el ancho del formulario */}
        <div className="relative flex items-center text-gray-400 focus-within:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6 absolute ml-3 pointer-events-none"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>

          <input
            type="text"
            name="search"
            placeholder="Search book"
            autoComplete="off"
            aria-label="Search talk"
            className="w-full pr-3 pl-10 py-2 font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          />
        </div>
      </form>
    </div>
  );
}
