import React from "react";
import { Header } from "../../header";
import BooksMenu from "./booksMenu";
import BookList from "./bookList";

const filterButton = (props) => {
  return (
    <div className="flex gap-2 w-full h-20 border border-black py-3 px-5">
      <button
        onClick={() => props.menuActivate()}
        value="Filtro"
        className="w-1/5 bg-[#3386c3] text-white hover:bg-[#236aa6] rounded-md  p-1 text-sm md:text-base"
      >
        Asignaturas
      </button>
      <form action="" className="flex items-center w-full">
        {/* Ajustar el ancho del formulario */}
        <div className="relative flex items-center w-full text-gray-400 focus-within:text-gray-600">
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
            className="w-full pr-3 pl-10 py-2 text-sm md:text-base font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
          />
        </div>
      </form>
      {/* <input
          type="text"
          name="search"
          id=""
          placeholder="Buscar libro"
          className="border border-black w-full h-auto"
        /> */}
    </div>
  );
};

export default filterButton;
