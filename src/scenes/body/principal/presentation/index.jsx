import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PresentLogo from "../../../../images/logo-titulo-2.png";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import FilterCard from "../../asignaturas/filterCard";

const domain_url = import.meta.env.VITE_DOMAIN_DB;

export default function index() {
  const [busqueda, useBusqueda] = useState("");
  const [searchState, useSearchState] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [newdata, setNewData] = useState([]);
  const [seleccionLibro, setSeleccionLibro] = useState("");
  const [busquedaLibro, setBusquedaLibro] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Realiza la consulta al backend
    fetch(`${domain_url}/api/libros_admin`, {
      method: "GET",
      headers: {
        // Authorization: "ak_2WpdCVHmAYXCqbSnuDcW6FAiJP1",
        // "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",

        // Otras cabeceras según sea necesario
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Almacena los resultados en el estado
        setNewData(data);
      });
  }, []);

  const handleFilter = (event) => {
    const busqueda = event.target.value;
    useBusqueda(busqueda);
    const newFilter = newdata.filter((value) => {
      return (
        value.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        value.autor.toLowerCase().includes(busqueda.toLowerCase())
      );
    });
    if (busqueda === "" || busqueda.length < 2) {
      setFilteredData([]);
      useSearchState(false);
    } else {
      useSearchState(true);
      setFilteredData(newFilter);
    }
  };

  const handleSeleccionLibro = (datoshijo) => {
    navigate("/asignaturas", {
      state: {
        searchBook: datoshijo,
      },
    });
  };

  function searchFilterHandle() {
    useSearchState(false);
  }
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (busqueda.length > 1) {
      setBusquedaLibro(busqueda);
      navigate("/asignaturas", {
        state: {
          selectedBook: busqueda,
        },
      });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <img
        src={PresentLogo}
        alt="logo-principal"
        className="w-11/12 md:w-3/5"
      />

      <div className="flex items-center w-full relative">
        <form action="" className="w-full" onSubmit={(e) => e.preventDefault()}>
          {/* Ajustar el ancho del formulario */}
          <div className="relative flex items-center w-full text-gray-500 focus-within:text-gray-600">
            <IoSearchOutline
              size={22}
              className="absolute ml-3 pointer-events-none"
            />

            <input
              type="text"
              name="search"
              placeholder={`${
                busqueda == 0 ? "Buscar libro" : "Minimo tres letras"
              }`}
              autoComplete="off"
              aria-label="Search talk"
              onChange={handleFilter}
              className="w-full pr-3 pl-10 py-2 text-xs md:text-sm xl:text-base font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
              onKeyDown={handleKeyDown}
            />

            <IoIosClose
              size={30}
              onClick={searchFilterHandle}
              className={`absolute right-0 mr-1 cursor-pointer ${
                searchState ? "block" : "hidden"
              }`}
            />
          </div>
        </form>
        <div
          className={`absolute top-12 bg-gray-100 -mb-7 w-full border border-gray-200 rounded-md grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 lg:gap-2 z-10 ${
            searchState ? "block" : "hidden"
          }`}
        >
          {/* {isLoading ? (
            <div className="text-center">Cargando...</div>
          ) : noResultsMessage ? (
            <div className="text-center">No se encontraron resultados</div>
          ) : (
            searchData.map((data) => <FilterCard data={data} />)
          )} */}
          {/* {isLoading ? (
            <div className="text-center">Cargando...</div>
          ) : noResultsMessage ? (
            <div className="text-center">No se encontraron resultados</div>
          ) : (
            searchData.map((data) => <FilterCard data={data} />)
          )} */}
          {filteredData.length != 0 ? (
            filteredData
              .slice(0, 15)
              .map((data) => (
                <FilterCard
                  data={data}
                  seleccionLibro={handleSeleccionLibro}
                  searchFilterHandle={searchFilterHandle}
                />
              ))
          ) : (
            <div className="text-center">No se encontraron resultados</div>
          )}
        </div>
      </div>
    </div>
  );
}
