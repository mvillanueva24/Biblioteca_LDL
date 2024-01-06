import React, { Fragment, useState, useEffect } from "react";
import Book from "../../../../images/Claudio-Gabis-portada.jpg";
import Modal from "../modal";

export default function BookCard(props) {
  // Data
  const [showModal, setShowModal] = useState(false);
  const [fechaEntrega, setFechaEntrega] = useState("");
  const [fechaDevolucion, setFechaDevolucion] = useState("");
  const [maxDate, setMaxDate] = useState("");

  // POST booking
  const [idLibro, setIdLibro] = useState(props.libro.id);
  const [idUser, setIdUser] = useState();

  const handleFechaEntregaChange = (event) => {
    const nuevaFechaEntrega = event.target.value;
    setFechaEntrega(nuevaFechaEntrega);

    // Calcula la fecha máxima permitida para devolución (7 días después de entrega)
    const fechaMaximaDevolucion = new Date(nuevaFechaEntrega);
    fechaMaximaDevolucion.setDate(fechaMaximaDevolucion.getDate() + 7);
    const formattedFechaMaximaDevolucion = fechaMaximaDevolucion
      .toISOString()
      .split("T")[0];

    // Verifica si la fecha de devolución actual está dentro del rango permitido,
    // si no, ajusta la fecha de devolución al nuevo valor permitido

    setMaxDate(formattedFechaMaximaDevolucion);
  };

  const obtenerFechaActual = () => {
    const fecha = new Date();
    const fecha_new = fecha.toISOString().split("T")[0];
    return fecha_new;
  };

  const handleFechaDevolucionChange = (event) => {
    setFechaDevolucion(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

  return (
    <Fragment>
      <div className="m-2 h-auto p-3 border-b-2 border-b-gray-700">
        <div className="w-full mr-2">
          <div className="border-b  border-b-gray-500 p-3">
            <div className="flex gap-2">
              <h5 className="font-bold truncate">{props.libro.titulo}</h5>
              <button className="bg-blue-200 h-auto rounded-full px-3 ">
                Ver
              </button>
            </div>
            <h5 className="text-gray-600 text-sm">{props.libro.codigo}</h5>
          </div>
        </div>
        <div className="flex">
          <div className="p-3 relative w-[80%]">
            <h5 className="truncate sm:text-gray-600 text-sm sm:text-base mb-2">
              {props.libro.autor}
            </h5>
            <h5 className="sm:text-gray-600 text-sm mb-2 sm:text-base ">
              Año de publicación: {props.libro.year}
            </h5>
            <h5 className="sm:text-gray-600 text-sm mb-2 sm:text-base ">
              Tipo de Libro:{" "}
              {props.libro.observacion == "C" ? "Copia" : "Original"}
            </h5>
            <h5 className="sm:text-gray-600 text-sm mb-2 sm:text-base ">
              Disponible: {props.libro.disponibilidad ? "Sí" : "No"}
            </h5>
            <button
              className="border border-green-700 p-2 rounded-lg text-sm sm:text-base "
              onClick={() => setShowModal(true)}
            >
              Reservar
            </button>
          </div>
          <div className="w-[20%] border border-blue-600 mt-1">
            <img
              className="h-full w-full object-contain"
              src={
                props.libro.portada == null
                  ? "https://res.cloudinary.com/dzdvijsh8/image/upload/v1698993787/Portadas/images_idmv2q.jpg"
                  : props.libro.portada
              }
              alt="icono"
            />
          </div>
        </div>
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Reservar Libro</h3>
          <h3 className="text-lg mt-3">Titulo {props.libro.titulo}</h3>
          <p className="text-base text-gray-500">Codigo {props.libro.codigo}</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIdLibro("");
              setIdUser("");
              setFechaEntrega("");
              setFechaDevolucion("");
              props.crearReserva(
                idLibro,
                idUser,
                fechaEntrega,
                fechaDevolucion
              );
            }}
            action=""
            method="post"
            className="mt-4 flex flex-col"
          >
            <input type="hidden" name="id_libro" value={idLibro} />
            <input type="hidden" name="id_user" value="2" />
            <p className="mb-1">Fecha de entrega</p>
            <input
              type="date"
              name="f_entrega"
              id="fecha_Entrega"
              className="w-auto border border-black p-1"
              value={fechaEntrega}
              min={obtenerFechaActual()}
              onChange={handleFechaEntregaChange}
            />
            <p className="mt-2 mb-1">Fecha de devolución</p>
            <input
              type="date"
              name="f_devol"
              id="fechaDevolucion"
              className="w-auto border border-black p-1"
              value={fechaDevolucion}
              onChange={handleFechaDevolucionChange}
              min={fechaEntrega}
              max={maxDate}
            />
            <button
              type="submit"
              className="mt-3 bg-blue-600 text-white p-2 hover:bg-blue-500"
            >
              Reservar
            </button>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
}
