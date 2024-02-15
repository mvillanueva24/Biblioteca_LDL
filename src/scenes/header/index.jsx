import React from "react";
import Logo from "../../images/logo.png";
import DropdownMenu from "./DropdownMenu";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import { useEffect } from "react";
const url = import.meta.env.VITE_DOMAIN_DB;

export function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const token = localStorage.getItem("TOKEN");
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const { currentUser, userToken, setCurrentUser, setUserToken } =
    useStateContext();
  const handleLogout = async (ev) => {
    try {
      const response = await fetch(`${url}/api/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error al cerrar sesión");
      }

      setCurrentUser({});
      setUserToken(null);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          // Manejar la situación en la que no hay token disponible
          console.error("No hay token disponible");
          return;
        }

        // Realiza la solicitud GET a la ruta '/me' incluyendo el token en el encabezado de Authorization
        const response = await fetch(`${url}/api/yo`, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${token}`,
            // Puedes incluir otros encabezados según sea necesario
          },
          // Puedes incluir otras opciones de configuración según tus necesidades
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos del servidor");
        }

        // Parsea la respuesta como JSON
        const data = await response.json();

        // Actualiza el estado del usuario con los datos recibidos
        setCurrentUser(data.user);
      } catch (error) {
        console.error(error);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario
      }
    };

    // Llama a la función para obtener y establecer los datos del usuario
    fetchUserData();
  }, []);

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
    <nav className="bg-[#e5eff9] fixed w-full z-50">
      <div className="px-10 mx-auto">
        <div className="flex justify-between">
          <div className="flex space-x-6">
            {/* logo */}
            <div>
              <a
                href="/"
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
          {/* <Link to="/login" className="hidden md:flex items-center">
            <button
              className="py-2 px-3 bg-[#3386c3] hover:bg-[#236aa6] text-white
              hover:text-white rounded transition duration-300 shadow"
            >
              Login
            </button>
          </Link> */}
          <div className="hidden md:flex items-center">
            {Object.keys(currentUser).length !== 0 ? (
              <div>
                <p>{currentUser.nombre}</p>
                <button onClick={() => handleLogout()}>Logout</button>
              </div>
            ) : (
              <Link
                to="/login"
                className="py-2 px-3 bg-[#3386c3] hover:bg-[#236aa6] text-white
                  hover:text-white rounded transition duration-300 shadow"
              >
                Login
              </Link>
            )}
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
        className={`${
          isMobileMenuOpen
            ? "block top-3 right-3 rounded-full p-2 z-30"
            : "hidden left-[-100%]"
        } md:hidden absolute bg-white`}
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
          <div className="py-1 pl-[0.10rem] cursor-pointer rounded hover:bg-[#f3f7fc]">
            <Link className="font-bold text-gray-500 mb-7 " to="/asignaturas">
              Asignaturas
            </Link>
          </div>

          <div className="mt-10">
            <Link
              to="/login"
              className="py-2 px-3 bg-[#3386c3] hover:bg-[#236aa6] text-white
              hover:text-white rounded transition duration-300 shadow"
            >
              Login
            </Link>
          </div>
          {/* <ul className="h-auto mt-3">
            {navLinks.map((asig) => (
              <a href="">
                <li key={asig.id} className="py-1 h-auto">
                  {asig.name}
                </li>
              </a>
            ))}
          </ul> */}
        </motion.div>
      </motion.nav>
    </nav>
  );
}
