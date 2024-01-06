import React, { useState } from "react";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Modal from "./modal";
export default function AsigOptions(props) {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [idAsign, setIdAsign] = useState("");
  const [asig, setAsignatura] = useState("");
  const [abrevAsignatura, setAbrevAsignatura] = useState("");

  const handleNombreAsignaturaChange = (event) => {
    setAsignatura(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

  const handleAbrevAsignaturaChange = (event) => {
    setAbrevAsignatura(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

  return (
    <div>
      <li
        key={props.asigdata.id}
        className="py-2 h-auto border-t text-lg hover:bg-gray-100 pl-1 flex"
      >
        <a href="">{props.asigdata.nombre}</a>
        {/* <div className="flex ml-auto">
          <button onClick={() => setShowModalEdit(true)}>
            <AiOutlineEdit size="1.3em" className="mr-1" />
          </button>
          <button onClick={() => setShowModalDelete(true)}>
            <AiOutlineDelete size="1.3em" />
          </button>
        </div> */}
      </li>
      {/* Modificar Asignatura */}
      <Modal isVisible={showModalEdit} onClose={() => setShowModalEdit(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Modificar Asignatura</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAsignatura("");
              setAbrevAsignatura("");
              props.editAsign(props.asigdata.id, asig, abrevAsignatura);
            }}
            method="post"
            className="mt-4 flex flex-col"
          >
            <p className="mb-1">Nombre de Asignatura</p>
            <input
              type="text"
              name="nombre_asignatura"
              id="nombre_asignatura"
              value={asig}
              onChange={handleNombreAsignaturaChange}
              placeholder={props.asigdata.nombre}
              className="w-auto border border-black p-1"
            />
            <p className="mt-2 mb-1">Abreviatura (Codigo)</p>
            <input
              type="text"
              name="abrev_asignatura"
              id="abrev_asignatura"
              value={abrevAsignatura}
              onChange={handleAbrevAsignaturaChange}
              placeholder={props.asigdata.abreviacion}
              className="w-auto border border-black p-1"
              maxLength="7"
            />
            <button
              type="submit"
              className="mt-3 bg-blue-600 text-white p-2 hover:bg-blue-500"
            >
              Modificar
            </button>
          </form>
        </div>
      </Modal>

      {/* Eliminar Asignatura */}
      <Modal
        isVisible={showModalDelete}
        onClose={() => setShowModalDelete(false)}
      >
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Eliminar Asignatura</h3>
          <h3 className="mt-5 text-lg text-center font-semibold">
            ¿Desea eliminar la asignatura: {props.asigdata.nombre}?
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIdAsign("");
              props.elimAsign(props.asigdata.id);
            }}
            action=""
            method="delete"
            className="mt-8 grid grid-cols-2 justify-items-stretch gap-7 w-full "
          >
            <button
              type="submit"
              className=" bg-gray-500 text-white p-2 hover:bg-gray-400"
              onClick={() => setShowModalDelete(false)}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-red-700 text-white p-2 hover:bg-red-400"
            >
              Eliminar
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
