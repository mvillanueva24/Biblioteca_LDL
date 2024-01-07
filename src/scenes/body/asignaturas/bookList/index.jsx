import React from "react";
import BookCard from "./bookCard";

export default function index(props) {
  function newBooking(idLibro, idUser, fechaEntrega, fechaDevolucion) {
    const data = {
      libro_id: idLibro,
      alumno_id: 2,
      fecha_entrega: fechaEntrega,
      fecha_devolucion: fechaDevolucion,
    };
    const url = "https://3317-187-86-164-82.ngrok-free.app/api/reservas_crear";
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
  return (
    <div className="w-full border border-black">
      {props.libros.map((el) => (
        <BookCard libro={el} crearReserva={newBooking} />
      ))}

      {/* <BookCard />
      <BookCard /> */}
    </div>
  );
}
