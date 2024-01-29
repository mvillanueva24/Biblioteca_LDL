import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuBookOpen, LuCalendarX, LuBookOpenCheck } from "react-icons/lu";

export default function Submenu({ items, subMenuState, expanded }) {
  return (
    <ul
      className={`flex-1 group bg-white shadow-lg transition-colors rounded-md ml-10  ${
        subMenuState ? "block" : "hidden"
      }`}
    >
      {items.map((item) => (
        <Link to={item.path} key={item.text}>
          <li
            key={item.path}
            className={`
        
            relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer
            transition-colors group
            hover:bg-indigo-50 text-gray-600
            group ${expanded ? "block" : "hidden"}        
    `}
          >
            <div
              className={`overflow-hidden transition-all ${
                expanded ? "w-8" : "w-0"
              }`}
            >
              {getIconComponent(item.icon)}
            </div>
            <span
              className={`overflow-hidden transition-all ${
                expanded ? "w-40 ml-3" : "w-0"
              }`}
            >
              {item.text}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
}

function getIconComponent(iconName) {
  const iconMapping = {
    LuBookOpen: LuBookOpen,
    LuCalendarX: LuCalendarX,
    LuBookOpenCheck: LuBookOpenCheck,
  };

  const IconComponent = iconMapping[iconName];

  if (IconComponent) {
    return <IconComponent size={27} />;
  } else {
    return null; // Puedes manejar el caso cuando el icono no se encuentra en el mapeo.
  }
}
