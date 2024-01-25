import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LuBookOpen, LuCalendarX, LuBookOpenCheck } from "react-icons/lu";

export default function Submenu({ items, subMenuState }) {
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
            group
        
    `}
          >
            React.createElement({item.icon}, size: 27 )
            <span className={`overflow-hidden transition-all ml-2`}>
              {item.text}
            </span>
          </li>
        </Link>
      ))}
    </ul>
  );
}
