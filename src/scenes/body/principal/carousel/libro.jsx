import React, { useState } from "react";
import Portada from "../../../../images/descarga.jpg";

export default function Libro() {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  return (
    <div
      className="group relative grid place-items-center w-full h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={Portada} alt="Libro" />
      {hovered && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-0 hover:bg-opacity-75 transition duration-300 ease-in-out flex flex-col px-3 pt-4">
          <h3 className="text-white text-sm font-bold mb-2">
            Armonía Funcional
          </h3>
          <p className="text-white text-xs">Claudio Gabis</p>
        </div>
      )}
    </div>
  );
}
