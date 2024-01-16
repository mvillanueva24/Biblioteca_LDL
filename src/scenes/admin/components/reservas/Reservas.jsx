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


const domain_url = import.meta.env.VITE_DOMAIN_DB;

const Reservas = () => {
  // Reservas
  const [data, setData] = useState([]);
  const [libros, setLibros] = useState([]);
  const [alumnos, setAlumno] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);

  // RESERVAS
  useEffect(() => {
    async function fetchAsignaturas() {
      const response = await fetch(
        `${domain_url}/api/reservas`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const data = await response.json();
      setData(data);
      setIsLoading(false);
    }
    fetchAsignaturas();
  }, []);

  // LIBROS
  useEffect(() => {
    async function fetchLibros() {
      const response = await fetch(
        `${domain_url}/api/libros_admin`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const libros = await response.json();
      setLibros(libros);
      setIsLoading(false);
    }
    fetchLibros();
  }, []);

  // ALUMNOS
  useEffect(() => {
    async function fetchLibros() {
      const response = await fetch(
        `${domain_url}/api/alumnos`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
      const alumnos = await response.json();
      setAlumno(alumnos);
      setIsLoading(false);
    }
    fetchLibros();
  }, []);


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
      {
        console.log(data)
      }
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
    </div>
  );
};

export default Reservas;
