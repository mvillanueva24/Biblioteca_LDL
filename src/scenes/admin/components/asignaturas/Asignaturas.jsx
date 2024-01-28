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
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Modal from "../../../body/asignaturas/modal";
import { useLoaderData } from "react-router-dom";

const domain_url = import.meta.env.VITE_DOMAIN_DB;

const Asignaturas = () => {
  // const [data, setData] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [asig, setAsignatura] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemName, setSelectedItemName] = useState(null);
  const [selectedItemAbrev, setSelectedItemAbrev] = useState(null);
  const [nombreAsignatura, setNombreAsignatura] = useState("");
  const [abrevAsignatura, setAbrevAsignatura] = useState("");

  const handleNombreAsignaturaChange = (event) => {
    setNombreAsignatura(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };

  const handleAbrevAsignaturaChange = (event) => {
    setAbrevAsignatura(event.target.value);
    //setFechaDevolucion(fechaEntrega);
  };
  const [isLoading, setIsLoading] = useState(true);

  const data = useLoaderData();

  async function newAsignatura(asig, abrevAsignatura) {
    const data = {
      nombre: asig,
      abreviacion: abrevAsignatura,
    };
    const response = await fetch(`${domain_url}/api/asignaturas_crear`, {
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

  async function delAsignatura(idAsign) {
    const data = {
      id: idAsign,
    };
    console.log(data);
    const response = await fetch(`${domain_url}/api/asignaturas_eliminar`, {
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

  async function editAsignatura(id, asig, abrevAsignatura) {
    const data = {
      id: id,
      nombre: asig,
      abreviacion: abrevAsignatura,
    };

    const response = await fetch(`${domain_url}/api/asignaturas_editar`, {
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

  // console.log(asignaturas);
  // console.log("DATA:", data);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      id: "S.No",
      cell: (info) => <span>{info.getValue()}</span>,
      header: "ID",
    }),
    columnHelper.accessor("nombre", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Asignaturas",
    }),
    columnHelper.accessor("abreviacion", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Abreviacion",
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
      <h3 className="text-2xl">Asignaturas</h3>
      <div className="mt-5 flex justify-between mb-2">
        <div className="w-full flex items-center gap-1">
          <BiSearchAlt2 />
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-[#236aa6]"
            placeholder="Search all columns..."
          />
          <button
            type="submit"
            className="mt-3 bg-[#3386c3] text-white hover:bg-[#236aa6] rounded-md p-2 "
            onClick={() => {
              setShowModalAdd(true);
            }}
          >
            Agregar
          </button>
        </div>
      </div>
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
                <td className="flex gap-6">
                  <button
                    className="bg-blue-400 text-white p-2 rounded-lg"
                    onClick={() => {
                      setSelectedItemId(row.original.id);
                      setSelectedItemName(row.original.nombre);
                      setSelectedItemAbrev(row.original.abreviacion);
                      setShowModalEdit(true);
                    }}
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded-lg"
                    onClick={() => {
                      setSelectedItemId(row.original.id);
                      setSelectedItemName(row.original.nombre);
                      setShowModalDelete(true);
                    }}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center h-32">
              <td colSpan={12}>No Recoard Found!</td>
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
      <Modal isVisible={showModalAdd} onClose={() => setShowModalAdd(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Crear Asignatura</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setNombreAsignatura("");
              setAbrevAsignatura("");
              newAsignatura(nombreAsignatura, abrevAsignatura);
              setShowModalAdd(false);
            }}
            method="post"
            className="mt-4 flex flex-col"
          >
            <p className="mb-1">Nombre de Asignatura</p>
            <input
              type="text"
              name="nombre_asignatura"
              id="nombre_asignatura"
              value={nombreAsignatura}
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
      <Modal isVisible={showModalEdit} onClose={() => setShowModalEdit(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Modificar Asignatura</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editAsignatura(selectedItemId, nombreAsignatura, abrevAsignatura);
              setShowModalEdit(false);
            }}
            method="post"
            className="mt-4 flex flex-col"
          >
            <p className="mb-1">Nombre de Asignatura</p>
            <input
              type="text"
              name="nombre_asignatura"
              id="nombre_asignatura"
              value={nombreAsignatura}
              onChange={handleNombreAsignaturaChange}
              placeholder={selectedItemName}
              className="w-auto border border-black p-1"
            />
            <p className="mt-2 mb-1">Abreviatura (Codigo)</p>
            <input
              type="text"
              name="abrev_asignatura"
              id="abrev_asignatura"
              value={abrevAsignatura}
              onChange={handleAbrevAsignaturaChange}
              placeholder={selectedItemAbrev}
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
            ¿Desea eliminar la asignatura: {selectedItemName}?
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              delAsignatura(selectedItemId);
              setShowModalDelete(false);
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
};

export default Asignaturas;

export const asignaturaLoader = async () => {
  // await fakeNetwork();
  const response = await fetch(`${domain_url}/api/asignaturas`, {
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
