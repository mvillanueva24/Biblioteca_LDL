import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const DropdownMenu = (props) => {
  const { navLinksData } = props;
  const [showSubMenu, setShowSubMenu] = useState(false);

  const variants = {
    open: {
      opacity: 1,
      transition: { type: "spring", delay: 0.1 },
    },
    closed: { x: "0%", opacity: 0 },
    display: "none",
  };

  const handleMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };
  const handleSubMenuMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleSubMenuMouseLeave = () => {
    setShowSubMenu(false);
  };
  return (
    <nav className="relative">
      <Link
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className=" self-center cursor-pointer"
        to="/asignaturas"
      >
        Asignaturas
      </Link>

      <div
        className={`absolute left-0 top-full ${
          showSubMenu ? "block" : "hidden"
        }`}
        onMouseEnter={handleSubMenuMouseEnter}
        onMouseLeave={handleSubMenuMouseLeave}
      >
        <motion.ul
          variants={variants}
          animate={showSubMenu ? "open" : "closed"}
          className={`${
            showSubMenu ? "block" : "hidden"
          }list-none w-48 border-r-2 bg-gray-300`}
        >
          {navLinksData.map((el) => (
            <li
              key={el.id}
              className="w-full h-auto pl-2 py-2 hover:bg-blue-400 transition duration-600 "
            >
              <a
                href="#"
                className="flex items-center w-full h-full"
                style={{ textDecoration: "none" }}
              >
                <span>{el.name}</span>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
};

export default DropdownMenu;
