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

const domain_url = import.meta.env.VITE_DOMAIN_DB;

const Reservas = () => {
  // Reservas
  const [data, setData] = useState([]);
  const [libros, setLibros] = useState([]);
  const [alumnos, setAlumno] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  // Modal Data
  const [reservaModal, setReservaModal] = useState(false);
  const [libroCodigo, setLibroCodigo] = useState("");
  const [dniUser, setDniUser] = useState("");

  // RESERVAS
  useEffect(() => {
    async function fetchAsignaturas() {
      const response = await fetch(`${domain_url}/api/reservas`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    }
    fetchAsignaturas();
  }, []);

  // LIBROS
  useEffect(() => {
    async function fetchLibros() {
      const response = await fetch(`${domain_url}/api/libros_admin`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const libros = await response.json();
      setLibros(libros);
      setIsLoading(false);
    }
    fetchLibros();
  }, []);

  // ALUMNOS
  useEffect(() => {
    async function fetchLibros() {
      const response = await fetch(`${domain_url}/api/alumnos`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      const alumnos = await response.json();
      setAlumno(alumnos);
      setIsLoading(false);
    }
    fetchLibros();
  }, []);

  const handleLibroCodigoChange = (event) => {
    setLibroCodigo(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

  const handleDniUserChange = (event) => {
    setDniUser(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

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

    // Actualizar la lista de asignaturas
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
      cell: (info) => <span>{info.getValue()}</span>,
      // cell: (info) => {
      //   const encontrarAlumno = alumnos.find((alumno) => alumno.id === info.getValue())
      //   const alumnoNombre = encontrarAlumno ? encontrarAlumno.nombre : null;
      //   const alumnoApellido = encontrarAlumno ? encontrarAlumno.apellido : null;
      //   return <span>{alumnoNombre+", "+alumnoApellido}</span>
      header: "Alumno",
    }),
    columnHelper.accessor("fecha_entrega", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Fecha de entrega",
    }),
    columnHelper.accessor("fecha_devolucion", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Fecha de devolucion",
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
      {console.log(data)}
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
          <h3 className="text-xl font-semibold">Crear Asignatura</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDniUser("");
              setLibroCodigo("");
              newReserva(libroCodigo, dniUser);
              setShowModalAdd(false);
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
    </div>
  );
};

export default Reservas;
