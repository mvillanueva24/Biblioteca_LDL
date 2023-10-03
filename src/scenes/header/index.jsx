import React from "react";
import Logo from "../../images/logo.png";
import DropdownMenu from "./DropdownMenu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
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
  ];

  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "tween", duration: 0.5 },
        opacity: { duration: 0.3 },
      },
    },
    closed: { x: "-100%", opacity: 0 },
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

  return (
    <nav className="bg-gray-100 fixed w-full z-50">
      <div className="px-10 mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-6">
            {/* logo */}
            <div>
              <a
                href="#"
                className="flex items-center py-3 px-3 text-gray-700 hover:text-gray-900"
              >
                <img src={Logo} alt="icono" className="h-12 w-12" />
                <span className="font-bold">Biblioteca LDL</span>
              </a>
            </div>
            {/* nav principal */}
            <div className="hidden md:flex items-center space-x-1">
              {/* <h4 className="py-2 px-3 text-gray-700 hover:text-gray-900">
                Asignaturas
              </h4> */}
              <DropdownMenu navLinksData={navLinks} />
            </div>
          </div>

          {/* nav secundario */}
          <div className="hidden md:flex items-center">
            <a
              href=""
              className="py-2 px-3 bg-yellow-400 hover:bg-yellow-300 text-yellow-900 
              hover:text-yellow-800 rounded transition duration-300 shadow"
            >
              Login
            </a>
          </div>

          {/* mobile button goes here */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              {/* <ion-icon name="menu-outline"></ion-icon> */}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={maskVariants}
        className={`${
          isMobileMenuOpen
            ? "block fixed top-0 left-0 right-0 bottom-0"
            : "hidden"
        } bg-black z-20`}
        onClick={() => setMobileMenuOpen(false)} // Cierra el menú al hacer clic en la máscara
      />
      {/* Botón de cierre */}
      <motion.button
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={moveButtonToTopRight}
        whileTap={{ scale: 0.8 }} // Animación de escala al presionar el botón
        className={`absolute top-3 right-3 bg-white rounded-full p-2 z-30`}
        onClick={() => setMobileMenuOpen(false)}
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
      </motion.button>

      <motion.nav
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        className={`${
          isMobileMenuOpen ? "block left-0" : "hidden left-[-100%]"
        } md:hidden absolute h-screen top-0 left-0 w-[17em] bg-white z-30 pt-5 px-3`}
      >
        <motion.div>
          <a className="font-bold text-gray-500 mb-7" href="/asignaturas">
            Asignaturas
          </a>
          <ul className="h-auto mt-3">
            {navLinks.map((asig) => (
              <a href="">
                <li key={asig.id} className="py-1 h-auto">
                  {asig.name}
                </li>
              </a>
            ))}
          </ul>
        </motion.div>
      </motion.nav>
    </nav>
  );
}
