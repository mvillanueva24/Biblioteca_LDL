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

const url = import.meta.env.VITE_DOMAIN_DB;

const Devueltos = () => {
  const data = useLoaderData();

  const navigate = useNavigate();

  async function acceptOrCancelEntrega(idEntrega) {
    const data = {
      id: idEntrega,
    };
    const response = await fetch(`${url}/api/entregas_concluir`, {
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
    navigate("/admin/entregas/no-entregado");
  }

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("id", {
      id: "S.No",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("alumnoNombre", {
      cell: (info) => info.getValue(),

      header: "Alumno",
    }),
    columnHelper.accessor("alumnoDNI", {
      // le metio ganas al nombre
      cell: (info) => <span>{info.getValue()}</span>,
      header: "DNI de Alumno",
    }),
    columnHelper.accessor("libroTitulo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Libro",
    }),
    columnHelper.accessor("libroCodigo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Codigo del Libro",
    }),
    columnHelper.accessor("fecha_entrega", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Fecha de Entrega",
    }),
    columnHelper.accessor("fecha_devolucion", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Fecha de devolución",
    }),
    columnHelper.accessor("demora", {
      cell: (info) => <span>{info.getValue()} días</span>,
      header: "Días de demora",
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
  const date = new Date();
  return (
    <div className="p-2 w-full  fill-gray-400 ">
      <h3 className="text-2xl">Reservas concluidas</h3>
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

export default Devueltos;

export const devueltosLoader = async () => {
  // await fakeNetwork();
  const response = await fetch(`${url}/api/entregas/concluidos`, {
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
