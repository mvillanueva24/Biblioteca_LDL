import { useState } from "react";
import { FaUser } from "react-icons/fa";
import AsignaturasP from "../scenes/body/asignaturas";
import { Header } from "../scenes/header";
import BooksMenu from "../scenes/body/asignaturas/booksMenu";
import BookList from "../scenes/body/asignaturas/bookList";

export default function Asignaturas() {
  return (
    <div className="relative">
      <Header></Header>
      <section className="h-[screen -60px] pt-24">
        <AsignaturasP />
      </section>
    </div>
  );
}
