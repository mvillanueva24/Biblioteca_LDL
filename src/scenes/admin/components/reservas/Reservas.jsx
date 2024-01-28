import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
//import { USERS } from "../data";
import { useState } from "react";
import DebouncedInput from "../DebouncedInput";
import { BiSearchAlt2 } from "react-icons/bi";
import { useEffect } from "react";
import Modal from "../../../body/asignaturas/modal";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { LuInfo } from "react-icons/lu";
import { useLoaderData, useNavigate, useOutlet } from "react-router-dom";

const domain_url = import.meta.env.VITE_DOMAIN_DB;

const Reservas = () => {
  // Reservas

  // Modal Data
  const [reservaModal, setReservaModal] = useState(false);
  const [libroCodigo, setLibroCodigo] = useState("");
  const [dniUser, setDniUser] = useState("");

  // Accept and Cancel Modal
  const [acceptModal, setAcceptModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [User, setUser] = useState("");
  const [Libro, setLibro] = useState("");
  const [diasPrestamo, setDiasPrestamo] = useState("");
  const [idReserva, setIdReserva] = useState("");

  // const [data, setData] = useState([])

  const handleLibroCodigoChange = (event) => {
    setLibroCodigo(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

  const handleDniUserChange = (event) => {
    setDniUser(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

  const data = useLoaderData();

  // useEffect(() => {
  //   // Cargar la lista de libros
  //   async function fetchLibros() {
  //     const response = await fetch(`${domain_url}/api/reservas`, {
  //       method: "GET",
  //       headers: {
  //         "ngrok-skip-browser-warning": "69420", // Puedes agregar más encabezados según sea necesario
  //       },
  //     });

  //     const data = await response.json();

  //     setData(data);
  //     setIsLoading(false);
  //   }

  //   fetchLibros();
  // }, []);

  const navigate = useNavigate();

  async function newReserva(libro, dni) {
    const data = {
      libro_codigo: libro.toUpperCase(),
      alumno_dni: dni,
    };
    const response = await fetch(`${domain_url}/api/reservas_crear_ahora`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Algo salió mal :c");
    }
  }

  async function acceptOrCancelReserva(idReserva, decision) {
    const data = {
      id: idReserva,
      decision: decision,
    };
    console.log(data);
    const response = await fetch(`${domain_url}/api/reservas_decision`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Algo salió mal :c");
    }
    navigate("/admin/reservas");
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      id: "S.No",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("nombreLibro", {
      cell: (info) => <span>{info.getValue()}</span>,

      // cell: (info) => {
      //   const encontrarLibro = libros.find((libro) => libro.id === info.getValue())
      //   const libro = encontrarLibro ? encontrarLibro.titulo : null;
      //   return <span>{libro}</span>
      // },
      header: "Libro",
    }),
    columnHelper.accessor("nombreAlumno", {
      cell: (info) => (
        <span className="flex ">
          <div className="grow">{info.getValue()} </div>
          <div className="relative group">
            {info.row.original.demoraAlumno == 0 ? (
              <div>
                <button className="bg-green-600 text-white p-1 rounded-full">
                  <LuInfo size={20} />
                </button>
                <div className="hidden group-hover:block w-30 absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 bg-green-300 shadow-lg rounded-lg">
                  <span>Último préstamo: Sin demoras</span>
                </div>
              </div>
            ) : (
              <div>
                <button className="bg-red-600 text-white p-1 rounded-full">
                  <LuInfo size={20} />
                </button>
                <div className="hidden group-hover:block w-30 absolute bottom-full left-1/2 transform -translate-x-1/2 p-2 bg-red-300 shadow-lg rounded-lg cursor-not-allowed">
                  <span>
                    Último préstamo: {info.row.original.demoraAlumno} dias de
                    demora
                  </span>
                </div>
              </div>
            )}
          </div>
        </span>
      ),

      header: "Alumno",
    }),
    columnHelper.accessor("dias_prestamo", {
      cell: (info) => <span>{info.getValue()} dias</span>,
      header: "Dias de préstamo",
    }),
  ];

  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="p-2 w-full  fill-gray-400 ">
      <h3 className="text-2xl">Reservas</h3>
      {/* INICIO BUSCADOR */}
      <div className="mt-5 flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <BiSearchAlt2 />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-[#236aa6]"
            placeholder="Buscar reserva..."
          />
          <button
            className="bg-[#3386c3] text-white hover:bg-[#236aa6] rounded-md p-2"
            onClick={() => setReservaModal(true)}
          >
            Reservar ahora
          </button>
        </div>
      </div>

      {/* INICIO TABLA DE RESERVAS */}
      <table className="border border-gray-700 w-full text-left">
        <thead className="bg-[#236aa6] text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th>Acciones</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, i) => (
              <tr
                key={row.id}
                className={` 
                ${i % 2 === 0 ? "bg-gray-200" : "bg-gray-300"}
                `}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-3.5 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td className="flex gap-6 mt-1">
                  <button
                    className="bg-green-600 text-white p-2 rounded-full"
                    onClick={() => {
                      setLibro(row.original.nombreLibro);
                      setUser(row.original.nombreAlumno);
                      setDiasPrestamo(row.original.dias_prestamo);
                      setIdReserva(row.original.id);
                      setAcceptModal(true);
                    }}
                  >
                    <RxCheck size={20} />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-full"
                    onClick={() => {
                      setLibro(row.original.nombreLibro);
                      setUser(row.original.nombreAlumno);
                      setDiasPrestamo(row.original.dias_prestamo);
                      setIdReserva(row.original.id);
                      setCancelModal(true);
                    }}
                  >
                    <RxCross2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>Sin reservas</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-gray-300 px-2 disabled:opacity-30"
        >
          {">"}
        </button>

        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
      </div>
      <Modal isVisible={reservaModal} onClose={() => setReservaModal(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Crear Reserva</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDniUser("");
              setLibroCodigo("");
              newReserva(libroCodigo, dniUser);
              setReservaModal(false);
            }}
            method="post"
            className="mt-4 flex flex-col"
          >
            <p className="mb-1">Libro a Reservar</p>
            <input
              type="text"
              name="codigo_libro"
              value={libroCodigo}
              onChange={handleLibroCodigoChange}
              className="w-auto border border-black p-1 uppercase"
            />
            <p className="mt-2 mb-1">DNI Alumno</p>
            <input
              type="text"
              name="dni_user"
              value={dniUser}
              onChange={handleDniUserChange}
              className="w-auto border border-black p-1"
              maxLength="8"
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

      {/* Accept Modal */}
      <Modal isVisible={acceptModal} onClose={() => setAcceptModal(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Aceptar Reserva</h3>
          <h3 className="mt-5 text-lg text-center font-semibold">
            ¿Desea aceptar esta reserva?
          </h3>
          {console.log(idReserva)}
          <div className="mt-2">
            <h4 className="text-base font-semibold">Datos:</h4>
            <p claseName="text-base">Libro: {Libro}</p>
            <p claseName="text-base">Pedido por: {User}</p>
            <p claseName="text-base">Días de préstamo: {diasPrestamo}</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLibro("");
              setUser("");
              setDiasPrestamo("");
              setIdReserva("");
              acceptOrCancelReserva(idReserva, true);
              setAcceptModal(false);
            }}
            action=""
            method="post"
            className="mt-8 grid grid-cols-2 justify-items-stretch gap-7 w-full "
          >
            <button
              type="button"
              className=" bg-gray-500 text-white p-2 hover:bg-gray-400 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white p-2 hover:bg-green-400 rounded-md"
            >
              Aceptar
            </button>
          </form>
        </div>
      </Modal>

      {/* Cancel Modal */}
      <Modal isVisible={cancelModal} onClose={() => setCancelModal(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Denegar Préstamo</h3>
          <h3 className="mt-5 text-lg text-center font-semibold">
            ¿Desea denegar esta reserva?
          </h3>
          <div className="mt-2">
            <h4 className="text-base font-semibold">Datos:</h4>
            <p claseName="text-base">Libro: {Libro}</p>
            <p claseName="text-base">Pedido por: {User}</p>
            <p claseName="text-base">Días de préstamo: {diasPrestamo}</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setLibro("");
              setUser("");
              setDiasPrestamo("");
              setIdReserva("");
              acceptOrCancelReserva(idReserva, false);
              setCancelModal(false);
            }}
            action=""
            method="post"
            className="mt-8 grid grid-cols-2 justify-items-stretch gap-7 w-full "
          >
            <button
              type="button"
              className=" bg-gray-500 text-white p-2 hover:bg-gray-400 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-red-700 text-white p-2 hover:bg-red-400 rounded-md"
            >
              Denegar
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Reservas;

export const reservaLoader = async () => {
  // await fakeNetwork();
  const response = await fetch(`${domain_url}/api/reservas`, {
    method: "GET",
    headers: {
      "ngrok-skip-browser-warning": "69420", // Puedes agregar más encabezados según sea necesario
    },
  });

  // Log the response object to check if it's valid
  console.log("Response object:", response);

  // Check if the response is OK (status code 200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Parse the response as JSON
  const data = await response.json();

  // Log the parsed data to check if it's valid
  console.log("Parsed data:", data);

  return data;
};
