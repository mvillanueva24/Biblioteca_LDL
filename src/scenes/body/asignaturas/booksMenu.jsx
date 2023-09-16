import React from "react";

const BooksMenu = (props) => {
  return (
    <div className=" px-3 py-3">
      <h4 className="font-bold text-xl m-3">Asignaturas</h4>
      <ul className="h-auto">
        {props.DataAsignaturas.map((asig) => (
          <a href="">
            <li key={asig.id} className="py-2 h-auto border-t text-lg">
              {asig.name}
            </li>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default BooksMenu;
