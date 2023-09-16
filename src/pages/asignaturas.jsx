import { useState } from "react";
import { FaUser } from "react-icons/fa";
import AsignaturasP from "../scenes/body/asignaturas";
import { Header } from "../scenes/header";
import BooksMenu from "../scenes/body/asignaturas/booksMenu";
import BookList from "../scenes/body/asignaturas/bookList";

export default function Asignaturas() {
  return (
    <div className="">
      <Header></Header>
      <AsignaturasP />
    </div>
  );
}
