import React from "react";
import BookCard from "./bookCard";

export default function index(props) {
  const url = import.meta.env.VITE_DOMAIN_DB;
  function newBooking(idLibro, idUser, dias_prestamo) {
    const data = {
      libro_id: idLibro,
      alumno_id: idUser,
      dias_prestamo: dias_prestamo,
    };
    fetch(`${url}/api/reservas_crear`, {
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
  return (
    <div className="w-full border border-black grid grid-cols-1 xl:grid-cols-2">
      {props.libros.map((el) => (
        <BookCard libro={el} crearReserva={newBooking} />
      ))}

      {/* <BookCard />
      <BookCard /> */}
    </div>
  );
}
