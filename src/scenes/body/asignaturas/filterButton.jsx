import React, { useEffect, useState } from "react";
import { Header } from "../../header";
import BooksMenu from "./booksMenu";
import BookList from "./bookList";
import debounce from "lodash/debounce";
import FilterCard from "./filterCard";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const domain_url = import.meta.env.VITE_DOMAIN_DB;

const filterButton = (props) => {
  const [busqueda, useBusqueda] = useState("");
  const [filter, useFilter] = useState("titulo");
  const [searchState, useSearchState] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [noResultsMessage, setNoResultsMessage] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [newdata, setNewData] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");

  const { seleccionLibro } = props;

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
    seleccionLibro(datoshijo);
  };

  // const debouncedSearch = debounce((busqueda) => {
  //   setIsLoading(true);
  //   const data = {
  //     search: busqueda,
  //     filtro: filter,
  //   };

  //   fetch(`${domain_url}/api/libros_busqueda`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data);
  //       if (data.length === 0) {
  //         setNoResultsMessage(true);
  //         setIsLoading(false);
  //       } else {
  //         setNoResultsMessage(false);
  //         setIsLoading(false);
  //         setSearchData(data);
  //       }
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, 1000); // Debounce delay de 300ms

  // useEffect(() => {
  //   debouncedSearch(busqueda);
  // }, [busqueda]);

  // useEffect(() => {
  //   if (busqueda.length > 2) {
  //     useSearchState(true);
  //   } else {
  //     useSearchState(false);
  //   }
  // }, [busqueda]);

  function searchFilterHandle() {
    // if (busqueda.length > 2) {
    //   useSearchState(true)
    // } else {
    //   useSearchState(false)
    // }
    useSearchState(false);
  }

  // useEffect(() => {
  //   // Realizar la solicitud a la API usando fetch
  //   const data = {
  //     search: busqueda,
  //     filtro: filter,
  //   };

  //   fetch(`${domain_url}/api/libros_busqueda`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },

  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // console.log(data.user);
  //       // Almacena el usuario en el estado
  //       // setUser(user);
  //       console.log("busqueda", data);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }, [busqueda]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (busqueda.length > 1) {
      props.busquedaLibro(busqueda);
    }
  };

  return (
    <div className="flex gap-2 w-full h-20 border border-black py-3 px-5">
      <button
        onClick={() => props.menuActivate()}
        value="Filtro"
        className="w-72 bg-[#3386c3] text-white hover:bg-[#236aa6] rounded-md  p-1 text-sm md:text-base"
      >
        Asignaturas
      </button>
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
              className="w-full pr-3 pl-10 py-2 text-sm md:text-base font-semibold placeholder-gray-500 text-black rounded-2xl border-none ring-2 ring-gray-300 focus:ring-gray-500 focus:ring-2"
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
          className={`absolute top-12 bg-gray-100 -mb-7 w-full border border-gray-200 rounded-md grid grid-cols-1 lg:grid-cols-2 lg:gap-2 z-10 ${
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
              .slice(0, 10)
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
