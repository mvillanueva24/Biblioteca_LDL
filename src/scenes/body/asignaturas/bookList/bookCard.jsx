import React from "react";
import Book from "../../../../images/Claudio-Gabis-portada.jpg";

export default function BookCard() {
  return (
    <div className="m-2 h-auto flex p-3 border-b-2 border-b-gray-700">
      <div className="w-[70%] mr-2">
        <div className="border-b  border-b-gray-500 p-3">
          <div className="flex gap-2">
            <h5 className="font-bold truncate">Armonía Funcional</h5>
            <button className="bg-blue-200 h-auto rounded-full px-3 ">
              Ver
            </button>
          </div>
          <h5 className="text-gray-600 text-sm">Codigo: MATE-0001</h5>
        </div>

        <div className="p-3 relative">
          <h5 className="truncate sm:text-gray-600 text-sm sm:text-base mb-2">
            Claudio Gabis
          </h5>
          <h5 className="sm:text-gray-600 text-sm mb-2 sm:text-base ">
            Año de publicación: 2010
          </h5>
          <h5 className="sm:text-gray-600 text-sm mb-2 sm:text-base ">
            Tipo de Libro: Original
          </h5>
          <h5 className="sm:text-gray-600 text-sm mb-2 sm:text-base ">
            Disponible: Sí
          </h5>
          <button className="border border-green-700 p-2 rounded-lg text-sm sm:text-base ">
            Reservar
          </button>
        </div>
      </div>

      <div className="w-[30%] border border-blue-600">
        <img className="h-full w-full object-contain" src={Book} alt="icono" />
      </div>
    </div>
  );
}
