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
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineFileImage,
} from "react-icons/ai";
import Modal from "../../../body/asignaturas/modal";

const Libros = () => {
  const [data, setData] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  // DATOS
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [selectedItemCodigo, setSelectedItemCodigo] = useState(null);
  const [selectedItemTitulo, setSelectedItemTitulo] = useState(null);
  const [selectedItemAutor, setSelectedItemAutor] = useState(null);
  const [selectedItemYear, setSelectedItemYear] = useState(null);
  const [selectedItemMueble, setSelectedItemMueble] = useState(null);
  const [selectedItemObser, setSelectedItemObser] = useState(null);
  const [selectedItemPortada, setSelectedItemPortada] = useState(null);
  const [selectedItemDispon, setSelectedItemDispon] = useState(null);
  const [selectedItemAsignId, setSelectedItemAsignId] = useState(null);

  const [codigo, setCodigo] = useState("");
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [year, setYear] = useState("");
  const [mueble, setMueble] = useState("");
  const [obser, setObser] = useState("");
  const [portada, setPortada] = useState("");
  const [dispon, setDispon] = useState("");
  const [idAsign, setIdAsign] = useState("");

  const handleCodigoChange = (event) => {
    setCodigo(event.target.value);
  };

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleAutorChange = (event) => {
    setAutor(event.target.value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMuebleChange = (event) => {
    setMueble(event.target.value);
  };

  const handleObserChange = (event) => {
    setObser(event.target.value);
  };

  const handlePortadaChange = (event) => {
    setPortada(event.target.files[0]);
  };

  const handleDisponChange = (event) => {
    setDispon(event.target.value);
  };

  const handleIdAsignChange = (event) => {
    setIdAsign(event.target.value);
  };
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar la lista de asignaturas
    async function fetchAsignaturas() {
      const response = await fetch(
        "https://9081-187-86-164-75.ngrok-free.app/api/libros",
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420", // Puedes agregar más encabezados según sea necesario
          },
        }
      );

      const data = await response.json();

      setData(data);
      setIsLoading(false);
    }

    fetchAsignaturas();
  }, []);

  async function newLibro(
    codigo,
    titulo,
    autor,
    year,
    mueble,
    obser,
    portada,
    dispon,
    idAsign
  ) {
    const data = {
      codigo: codigo,
      titulo: titulo,
      autor: autor,
      year: year,
      mueble: mueble,
      observacion: obser,
      image: portada,
      disponibilidad: dispon,
      asignatura_id: idAsign,
    };
    console.log(data);
    const response = await fetch(
      "https://9081-187-86-164-75.ngrok-free.app/api/libros_crear",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(data),
      }
    );
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
    const response = await fetch(
      "https://9081-187-86-164-75.ngrok-free.app/api/libros_eliminar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(data),
      }
    );

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

    const response = await fetch(
      "https://9081-187-86-164-75.ngrok-free.app/api/libros_editar",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        },
        body: JSON.stringify(data),
      }
    );

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
    columnHelper.accessor("codigo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Codigo",
    }),
    columnHelper.accessor("titulo", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Titulo",
    }),
    columnHelper.accessor("autor", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Autor",
    }),
    columnHelper.accessor("year", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Año",
    }),
    columnHelper.accessor("mueble", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Mueble",
    }),
    columnHelper.accessor("observacion", {
      cell: (info) => (
        <span>{info.getValue() == "O" ? "Original" : "Copia"}</span>
      ),
      header: "Observación",
    }),
    columnHelper.accessor("Disponibilidad", {
      cell: (info) => <span>{info.getValue() ? "Sí" : "No"}</span>,
      header: "Disponibilidad",
    }),
    columnHelper.accessor("asignatura_id", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Asignatura",
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
      <h3 className="text-2xl">Libros</h3>
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
                      setSelectedItemTitulo(row.original.titulo);
                      setShowModalDelete(true);
                    }}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                  <div className="relative group">
                    <button className="bg-green-700 text-white p-2 rounded-lg">
                      <AiOutlineFileImage size={20} />
                    </button>
                    <div className="hidden group-hover:block w-36 absolute bottom-full left-1/2 transform -translate-x-1/2 p-4 bg-white shadow-lg">
                      {/* Contenido flotante */}
                      <img
                        src={
                          row.original.portada == null
                            ? "https://res.cloudinary.com/dzdvijsh8/image/upload/v1698993787/Portadas/images_idmv2q.jpg"
                            : row.original.portada
                        }
                        object-fit="cover"
                        alt="Descripción de la imagen"
                      />
                    </div>
                  </div>
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
          <h3 className="text-xl font-semibold">Crear Libro</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setCodigo("");
              setTitulo("");
              setAutor("");
              setYear("");
              setMueble("");
              setObser("");
              setPortada("");
              setDispon("");
              setIdAsign("");
              newLibro(
                codigo,
                titulo,
                autor,
                year,
                mueble,
                obser,
                portada,
                dispon,
                idAsign
              );
              setShowModalAdd(false);
            }}
            method="post"
            encType="multipart/form-data"
            className="mt-4 flex flex-col"
          >
            <div className="flex gap-16">
              <div>
                <p className="mb-1">Código</p>
                <input
                  type="text"
                  name="nombre_asignatura"
                  id="nombre_asignatura"
                  value={codigo}
                  onChange={handleCodigoChange}
                  className="w-auto border border-black p-1"
                />
              </div>
              <div>
                <p className="mb-1">Asignatura</p>
                <input
                  type="text"
                  name="abrev_asignatura"
                  id="abrev_asignatura"
                  value={idAsign}
                  onChange={handleIdAsignChange}
                  className="w-auto border border-black p-1"
                />
              </div>
            </div>
            <p className="mt-2 mb-1">Título</p>
            <input
              type="text"
              name="abrev_asignatura"
              id="abrev_asignatura"
              value={titulo}
              onChange={handleTituloChange}
              className="w-auto border border-black p-1"
            />
            <p className="mt-2 mb-1">Autor</p>
            <input
              type="text"
              name="abrev_asignatura"
              id="abrev_asignatura"
              value={autor}
              onChange={handleAutorChange}
              className="w-auto border border-black p-1"
            />
            <div className="flex gap-5">
              <div>
                <p className="mt-2 mb-1">Año</p>
                <input
                  type="number"
                  min="1200"
                  max="2050"
                  step="1"
                  name="abrev_asignatura"
                  id="abrev_asignatura"
                  value={year == null ? 1900 : year}
                  onChange={handleYearChange}
                  className="w-auto border border-black p-1"
                  maxLength="4"
                />
              </div>
              <div>
                <p className="mt-2 mb-1">Mueble</p>
                <input
                  type="text"
                  name="abrev_asignatura"
                  id="abrev_asignatura"
                  value={mueble}
                  onChange={handleMuebleChange}
                  className="w-32 border border-black p-1"
                  maxLength="4"
                />
              </div>
              <div>
                <p className="mt-2 mb-1">Observación</p>
                <select
                  name="observ"
                  onChange={handleObserChange}
                  value={obser}
                  className="border border-black p-1 rounded-sm"
                >
                  <option value="O">Original</option>
                  <option value="C">Copia</option>
                </select>
              </div>
              <div>
                <p className="mt-2 mb-1">Disponibilidad</p>
                <select
                  name="observ"
                  onChange={handleDisponChange}
                  className="border border-black p-1 rounded-sm"
                  value={dispon}
                >
                  <option value={true}>Disponible</option>
                  <option value={false}>No Disponible</option>
                </select>
              </div>
            </div>
            <div>
              <p className="mt-2 mb-1">Portada</p>
              <input
                type="file"
                name="file"
                id="file"
                value={portada}
                onChange={handlePortadaChange}
                className="w-auto border border-black p-1"
              />
            </div>

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

export default Libros;
