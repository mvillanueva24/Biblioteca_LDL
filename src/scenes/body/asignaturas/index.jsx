import React, { useState, useEffect } from "react";
import BooksMenu from "./booksMenu";
import BookList from "./bookList";
import FilterButton from "./filterButton";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

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

  const Libros = [
    {
      name: "Asignatura 1",
      id: 1,
      libros: [
        {
          id: 1,
          id_asignatura: 1,
          nombre: "Armonia Funcional",
          autor: "Claudio Gabis",
          year: 1800,
          tipo: "1",
          disponibilidad: false,
        },
        {
          id: 2,
          id_asignatura: 1,
          nombre: "Armonia Funcional 2",
          autor: "Claudio Gabis",
          year: 1800,
          tipo: "1",
          disponibilidad: false,
        },
      ],
    },
    {
      name: "Asignatura 2",
      id: 2,
      libros: [
        {
          id: 1,
          id_asignatura: 2,
          nombre: "Armonia Funcional",
          autor: "Claudio Gabis",
          year: 1800,
          tipo: "1",
          disponibilidad: false,
        },
        {
          id: 2,
          id_asignatura: 2,
          nombre: "Armonia Funcional 2",
          autor: "Claudio Gabis",
          year: 1800,
          tipo: "1",
          disponibilidad: false,
        },
      ],
    },
    {
      name: "Asignatura 3",
      id: 3,
      libros: [
        {
          id: 1,
          id_asignatura: 3,
          nombre: "Armonia Funcional",
          autor: "Claudio Gabis",
          year: 1800,
          tipo: "1",
          disponibilidad: false,
        },
        {
          id: 2,
          id_asignatura: 3,
          nombre: "Armonia Funcional 2",
          autor: "Claudio Gabis",
          year: 1800,
          tipo: "1",
          disponibilidad: false,
        },
      ],
    },
    {
      name: "Asignatura 4",
      id: 4,
    },
  ];

  const Asignaturas = [
    {
      name: "Asignatura 1",
      id: 1,
    },
    {
      name: "Asignatura 2",
      id: 2,
    },
    {
      name: "Asignatura 3",
      id: 3,
    },
    {
      name: "Asignatura 4",
      id: 4,
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto m-10 px-3 py-5 border border-cyan-600">
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
          <BooksMenu DataAsignaturas={Asignaturas} />
        </div>
      </motion.nav>

      <div>
        <FilterButton menuActivate={() => changeIsMenuOpen()} />
      </div>
      <div className="mx-auto mt-8 flex gap-3 border border-black px-5 py-3">
        <div
          className={`${
            IsMenuOpen ? "block" : "hidden"
          } w-[30%] h-min border border-red-600 `}
        >
          <BooksMenu DataAsignaturas={Asignaturas} />
        </div>
        <div className="w-full">
          <BookList />
        </div>
      </div>
    </div>
  );
}
