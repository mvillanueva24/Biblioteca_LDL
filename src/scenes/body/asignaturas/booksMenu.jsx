import React, { useState } from "react";
import Modal from "./modal";
import AsigOptions from "./asigOptions";

export default function BooksMenu(props) {
  const [showModal, setShowModal] = useState(false);
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

  function elimAsign(idAsign) {
    const data = {
      id: idAsign,
    };
    const url = `https://da5e-187-86-164-86.ngrok-free.app/api/asignaturas_eliminar`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Algo salió mal :c");
        }
        return response.json();
      })
      .then((data) => {
        // add was succeful
        //hide the modal
        //make sure the list updated
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function editAsign(id, asig, abrevAsignatura) {
    const data = {
      id: id,
      nombre: asig,
      abreviacion: abrevAsignatura,
    };
    const url = `https://da5e-187-86-164-86.ngrok-free.app/api/asignaturas_editar`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Algo salió mal :c");
        }
        return response.json();
      })
      .then((data) => {
        // add was succeful
        //hide the modal
        //make sure the list updated
      })
      .catch((e) => {
        console.log(e);
      });
  }

  // function newAsignatura(asig, abrevAsignatura) {
  //   const data = {
  //     nombre: asig,
  //     abreviacion: abrevAsignatura,
  //   };
  //   const url =
  //     "https://c29a-187-86-164-72.ngrok-free.app/api/asignaturas_crear";
  //   fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Algo salió mal :c");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // add was succeful
  //       //hide the modal
  //       //make sure the list updated
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  return (
    <div
      className={`${
        props.Menustate ? "border-r-2 border-b-2 border-gray-400" : " "
      } px-3 py-3 `}
    >
      <h4 className="font-bold text-xl m-3">Asignaturas</h4>
      {/* <button
        onClick={() => setShowModal(true)}
        className="w-full mb-3 p-2 text-base text-center bg-green-500 hover:bg-green-400"
      >
        Agregar Asignatura
      </button> */}
      <ul className="h-auto">
        {props.DataAsignaturas.map((asig) => (
          <AsigOptions
            asigdata={asig}
            elimAsign={elimAsign}
            editAsign={editAsign}
          ></AsigOptions>
        ))}
      </ul>

      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold">Crear Asignatura</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setAsignatura("");
              setAbrevAsignatura("");
              props.crearAsignatura(asig, abrevAsignatura);
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
              className="w-auto border border-black p-1"
            />
            <p className="mt-2 mb-1">Abreviatura (Codigo)</p>
            <input
              type="text"
              name="abrev_asignatura"
              id="abrev_asignatura"
              value={abrevAsignatura}
              onChange={handleAbrevAsignaturaChange}
              className="w-auto border border-black p-1"
              maxLength="7"
            />
            <button
              type="submit"
              className="mt-3 bg-blue-600 text-white p-2 hover:bg-blue-500"
            >
              Agregar
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
