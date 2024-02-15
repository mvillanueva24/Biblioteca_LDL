import React from "react";

const FilterCard = (props) => {
  const { seleccionLibro } = props;
  return (
    <div
      className="px-2 py-1 hover:bg-gray-200 border-b-2 border-gray-300 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        props.searchFilterHandle();
        seleccionLibro(props.data.id);
      }}
    >
      <p className="text-sm lg:text-base">
        <b>{props.data.titulo}</b>
      </p>

      <p className="text-sm lg:text-base">
        <i>{props.data.autor}</i>
      </p>
    </div>
  );
};

export default FilterCard;
