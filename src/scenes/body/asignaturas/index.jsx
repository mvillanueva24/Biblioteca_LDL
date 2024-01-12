import React, { useState, useEffect } from "react";
import BooksMenu from "./booksMenu";
import BookList from "./bookList";
import FilterButton from "./filterButton";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import global from "../../../global";
import axios from "axios";

export default function index() {
  let isTab = useMediaQuery({ query: "(max-width: 980px" });

  const [IsMobileOpen, setIsMobileOpen] = useState(false);
  const [IsMenuOpen, setIsMenuOpen] = useState(true);

  const MenuMobile = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.5 },
        opacity: { duration: 0.3 },
      },
    },
    closed: { x: "100%", opacity: 0 },
  };

  const maskVariants = {
    open: { opacity: 0.6 },
    closed: { opacity: 0 },
  };

  const moveButtonToTopRight = {
    // closed: { x: "100%", y: "-100%" },
    closed: { x: "-100%", opacity: 0 },
    open: { x: "calc(100% - 60px)", y: "7px", opacity: 1 },
  };

  const changeIsMobileOpenState = () => {
    setIsMobileOpen(!IsMobileOpen);
  };

  const changeIsMenuOpen = () => {
    if (isTab) {
      setIsMobileOpen(!IsMobileOpen);
    } else {
      setIsMenuOpen(!IsMenuOpen);
    }
  };

  useEffect(() => {
    if (isTab) {
      setIsMobileOpen(false);
      setIsMenuOpen(false);
    } else {
      setIsMobileOpen(true);
      setIsMenuOpen(true);
    }
  }, [isTab]);

  const [asignaturas, setAsignaturas] = useState([]); // Aquí almacenaremos los datos de la API
  const [libros, setLibros] = useState([]);
  const [info, setInfo] = useState({});
  const url = "https://da5e-187-86-164-86.ngrok-free.app";
  const [page, setCurrentPage] = useState(1);
  const urlLibros = `https://da5e-187-86-164-86.ngrok-free.app/api/libros?page=${page}`;
  // const storedPage = localStorage.getItem('currentPage');
  // return storedPage ? parseInt(storedPage, 10) : 1;
  useEffect(() => {
    // Realizar la solicitud a la API usando fetch
    const fetchData = async () => {
      const result = await fetch(`${url}/api/asignaturas`, {
        method: "GET",
        headers: {
          // Authorization: "ak_2WpdCVHmAYXCqbSnuDcW6FAiJP1",
          // "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",

          // Otras cabeceras según sea necesario
        },
      });
      result.json().then((json) => {
        setAsignaturas(json);
      });
    };
    fetchData();
  }, []);

  const fetchLibros = (url) => {
    const fetchData = async () => {
      const result = await fetch(url, {
        method: "GET",
        headers: {
          // Authorization: "ak_2WpdCVHmAYXCqbSnuDcW6FAiJP1",
          // "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",

          // Otras cabeceras según sea necesario
        },
      });
      result.json().then((json) => {
        setLibros(json.data);
        setInfo(json);
      });
    };
    fetchData();
  };

  useEffect(() => {
    fetchLibros(urlLibros);
  }, [page]);

  function newAsignatura(asig, abrevAsignatura) {
    const data = {
      nombre: asig,
      abreviacion: abrevAsignatura,
    };
    const url = `https://da5e-187-86-164-86.ngrok-free.app/api/asignaturas_crear`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Algo salió mal :c");
        }
        return response.json();
      })
      .then((data) => {
        // add was succeful
        //hide the modal
        //make sure the list updated
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div className="max-w-screen-xl mx-auto px-3 py-5">
      <motion.div
        initial="closed"
        animate={IsMobileOpen ? "open" : "closed"}
        variants={maskVariants}
        className={`${
          IsMobileOpen && isTab
            ? "block fixed top-0 left-0 right-0 bottom-0"
            : "hidden"
        } bg-black z-20`}
        onClick={() => setIsMobileOpen(false)} // Cierra el menú al hacer clic en la máscara
      />

      {/* <motion.button
        initial="closed"
        animate={IsMobileOpen ? "open" : "closed"}
        variants={moveButtonToTopRight}
        whileTap={{ scale: 0.8 }} // Animación de escala al presionar el botón
        className={`absolute top-3 rigth-0 bg-white rounded-full p-2 z-30`}
        onClick={() => setIsMobileOpen(false)}
      >
        <svg
          className="w-6 h-6 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button> */}

      <motion.nav
        initial="closed"
        variants={MenuMobile}
        animate={IsMobileOpen ? "open" : "closed"}
        className={`${
          IsMobileOpen && isTab ? "block rigth-0" : "hidden right-[100%]"
        } 
        absolute bg-white text-black shadow-xl top-0 right-0 z-[999] w-[16rem] max-w-[16rem] h-full pt-5 px-3`}
      >
        <div>
          <BooksMenu
            DataAsignaturas={asignaturas}
            crearAsignatura={newAsignatura}
          />
        </div>
      </motion.nav>

      <div>
        <FilterButton menuActivate={() => changeIsMenuOpen()} />
      </div>
      <div className="mx-auto mt-8 border border-black px-5 py-3">
        <div className="flex gap-3 ">
          <div className={`${IsMenuOpen ? "block" : "hidden"} w-[30%] h-min `}>
            <BooksMenu
              DataAsignaturas={asignaturas}
              Menustate={IsMenuOpen}
              crearAsignatura={newAsignatura}
            />
          </div>
          <div className="w-full">
            <BookList libros={libros} />
          </div>
        </div>

        <div className="flex justify-center gap-1">
          {info.prev_page_url ? (
            <div>
              <button
                className="bg-gray-100 border border-black px-2 py-1"
                onClick={() => setCurrentPage((prev_page) => prev_page - 1)}
              >
                Anterior
              </button>
            </div>
          ) : null}

          {info.next_page_url ? (
            <div>
              <button
                className="bg-gray-100 border border-black px-2 py-1"
                onClick={() => setCurrentPage((next_page) => next_page + 1)}
              >
                Siguiente
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
