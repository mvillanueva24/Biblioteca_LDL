import { useContext, createContext, useState } from "react";
import Logo from "../../../images/logo.png";
import { Link } from "react-router-dom";
import { IoMdExit } from "react-icons/io";
import { BiLastPage, BiFirstPage } from "react-icons/bi";
import { useStateContext } from "../../../contexts/ContextProvider";
import {
  GrFormPrevious,
  GrFormNext,
  GrFormDown,
  GrFormUp,
} from "react-icons/gr";
import SubMenu from "./SubMenu";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

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
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-2 pr-5 pb-2 flex justify-between items-center border-b">
          <a
            href=""
            className="flex items-center py-3 px-3 text-gray-700 hover:text-gray-900"
          >
            <img
              src={Logo}
              alt="icono"
              className={`overflow-hidden transition-all ${
                expanded ? "w-12" : "w-0"
              }`}
            />
            <span
              className={`overflow-hidden transition-all font-bold ${
                expanded ? "w-40" : "w-0"
              }`}
            >
              Biblioteca LDL
            </span>
          </a>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <GrFormPrevious size={24} /> : <GrFormNext size={24} />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 pl-6 items-center hover:bg-gray-100 cursor-pointer">
          <IoMdExit size={40} />
          <span
            className={`overflow-hidden transition-all text-[1.4em] ml-4 ${
              expanded ? "w-40" : "w-0"
            }`}
            onClick={() => handleLogout()}
          >
            Exit
          </span>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, path, items }) {
  const { expanded } = useContext(SidebarContext);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  return (
    <div>
      {path == null ? (
        <div>
          <li
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
        ${submenuOpen ? "group" : ""}
    `}
            onClick={() => setSubmenuOpen(!submenuOpen)}
          >
            {icon}
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              {text}
            </span>
            {items &&
              (submenuOpen ? (
                <span className={`${expanded ? "block" : "hidden"}`}>
                  <GrFormUp size={25} />{" "}
                </span>
              ) : (
                <span className={`${expanded ? "block" : "hidden"}`}>
                  <GrFormDown size={25} />
                </span>
              ))}
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}

            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                {text}
              </div>
            )}
          </li>
          {items && (
            <SubMenu
              items={items}
              subMenuState={submenuOpen}
              expanded={expanded}
            />
          )}
        </div>
      ) : (
        <Link to={path}>
          <li
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
        ${submenuOpen ? "group" : ""}
    `}
            onClick={() => setSubmenuOpen(!submenuOpen)}
          >
            {icon}
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              {text}
            </span>
            {alert && (
              <div
                className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
                  expanded ? "" : "top-2"
                }`}
              />
            )}

            {!expanded && (
              <div
                className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
              >
                {text}
              </div>
            )}
          </li>
          {items && (
            <SubMenu
              items={items}
              subMenuState={submenuOpen}
              expanded={expanded}
            />
          )}
        </Link>
      )}
    </div>
  );
}
