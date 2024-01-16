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


//URL DB
const domain_url = import.meta.env.VITE_DOMAIN_DB;

// COMPONENTE
const Libros = () => {
  const [data, setData] = useState([]);
  const [dataAsig, setDataAsig] = useState([]);
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

  const [mostrarPortada, setMostrarPortada] = useState(null);

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
    setMostrarPortada(URL.createObjectURL(event.target.files[0]))
    console.log(portada)
  };

  const handleDisponChange = (event) => {
    const disponibilidad = event.target.value === 'true';
    setDispon(disponibilidad);
    console.log(dispon)
  };

  const handleIdAsignChange = (event) => {
    setIdAsign(event.target.value);
  };

  const handlePortadaRemove = () => {
    setPortada(null)
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar la lista de libros
    async function fetchLibros() {
      const response = await fetch(
        `${domain_url}/api/libros_admin`,
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

    fetchLibros();
  }, []);

  useEffect(() => {
    // Cargar la lista de asignaturas
    async function fetchAsignaturas() {
      const response = await fetch(
        `${domain_url}/api/asignaturas`,
        {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "69420", // Puedes agregar más encabezados según sea necesario
          },
        }
      );

      const dataAsig = await response.json();

      setDataAsig(dataAsig);
      setIsLoading(false);
      // console.log("Data de Asignaturas:", dataAsig)
    }

    fetchAsignaturas();
  }, []);

  async function newLibro(
    codigo,
    titulo,
    autor,
    year,
    mueble,
    observacion,
    disponibilidad,
    asignatura_id,
    portada) {

    const formData = new FormData();
    formData.append('codigo', codigo);
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('year', year);
    formData.append('mueble', mueble);
    formData.append('observacion', observacion);
    formData.append('disponibilidad', disponibilidad);
    formData.append('asignatura_id', asignatura_id);
    formData.append('portada', portada);

    const response = await fetch(
      `${domain_url}/api/libros_crear`,
      {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        body: formData,
      }
    );
    console.log(formData)
    if (!response.ok) {
      throw new Error("Algo salió mal :c");
    }

    // Actualizar la lista de asignaturas
  }

  async function delLibro(idAsign) {
    const data = {
      id: idAsign,
    };
    console.log(data);
    const response = await fetch(
      `${domain_url}/api/libros_eliminar`,
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

  async function editLibro(
    id,
    codigo,
    titulo,
    autor,
    year,
    mueble,
    observacion,
    disponibilidad,
    asignatura_id,
    portada) {

    const formData = new FormData();
    formData.append('id', id);
    formData.append('codigo', codigo);
    formData.append('titulo', titulo);
    formData.append('autor', autor);
    formData.append('year', year);
    formData.append('mueble', mueble);
    formData.append('observacion', observacion);
    formData.append('disponibilidad', disponibilidad);
    formData.append('asignatura_id', asignatura_id);
    formData.append('portada', portada);

    const response = await fetch(
      `${domain_url}/api/libros_editar`,
      {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        body: formData,
      }
    );
    console.log(formData)
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
    columnHelper.accessor("disponibilidad", {
      cell: (info) => <span>{info.getValue() == true ? "Sí" : "No"}</span>,
      header: "Disponibilidad",
    }),
    columnHelper.accessor("asignatura_id", {
      cell: (info) => {
        const asignaturaEncontrada = dataAsig.find((asignatura) => asignatura.id === info.getValue());
        //No podemos usar directamente la const asignaturaEncontrada, debemos renderizar las propiedades en otra constante.
        const idAsignatura = asignaturaEncontrada ? asignaturaEncontrada.nombre : null;
        return <span>{idAsignatura}</span>
      },
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
              setCodigo("");
              setTitulo("");
              setAutor("");
              setYear("");
              setMueble("");
              setObser("");
              setDispon("");
              setIdAsign("");
              setPortada(null);
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
                      setSelectedItemCodigo(row.original.codigo);
                      setSelectedItemTitulo(row.original.titulo);
                      setSelectedItemAutor(row.original.autor);
                      setSelectedItemYear(row.original.year);
                      setSelectedItemMueble(row.original.mueble);
                      setSelectedItemObser(row.original.observacion);
                      setSelectedItemPortada(row.original.portada);
                      setSelectedItemDispon(row.original.disponibilidad);
                      setSelectedItemAsignId(row.original.asignatura_id);
                      setCodigo(row.original.codigo);
                      setTitulo(row.original.titulo);
                      setAutor(row.original.autor);
                      setYear(row.original.year);
                      setMueble(row.original.mueble);
                      setObser(row.original.observacion);
                      setDispon(row.original.disponibilidad);
                      setPortada(null);
                      setIdAsign(row.original.asignatura_id);
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
                            ? "https://res.cloudinary.com/dzdvijsh8/image/upload/v1704550287/Portadas/images_idmv2q_oky4qw.png"
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
              newLibro(
                codigo,
                titulo,
                autor,
                year,
                mueble,
                obser,
                dispon,
                idAsign,
                portada
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
                <select name="abrev_asignatura" onChange={handleIdAsignChange} className="border border-black p-1 rounded-sm">
                  {dataAsig.map((asig) => (
                    <option key={asig.id} value={asig.id}>{asig.nombre}</option>
                  ))}
                </select>
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
                onChange={handlePortadaChange}
                className="w-auto border border-black p-1 self-center"
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
      <Modal isVisible={showModalEdit} onClose={() => setShowModalEdit(false)}>
        <div className=" p-6">
          {console.log(selectedItemPortada)}
          {console.log(portada)}
          <h3 className="text-xl font-semibold">Editar Libro</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editLibro(
                selectedItemId,
                codigo,
                titulo,
                autor,
                year,
                mueble,
                obser,
                dispon,
                idAsign,
                portada
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
                <select name="abrev_asignatura" onChange={handleIdAsignChange} value={idAsign} className="border border-black p-1 rounded-sm">
                  {dataAsig.map((asig) => (
                    <option key={asig.id} value={asig.id}>{asig.nombre}</option>
                  ))}
                </select>
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
              {
                selectedItemPortada === null ? (
                  <div className="flex">
                    {
                      portada === null ? (
                        <div className="w-full p-1 self-center text-center">
                          <label htmlFor="file" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Subir nueva portada
                            <input type="file"
                              name="file"
                              id="file"
                              onChange={handlePortadaChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="w-full p-1 self-center text-center">
                          <div className="flex flex-col items-center justify-center text-center">
                            <br />
                            <img src={mostrarPortada} width={100} height={200} alt="Portada" />
                            <p>{portada.name}</p>
                            <button onClick={handlePortadaRemove} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Eliminar archivo</button>
                          </div>
                        </div>
                      )
                    }
                  </div>

                ) : (
                  <div className="flex">
                    <img src={selectedItemPortada} width={200} height={300} alt="Portada" />
                    {
                      portada === null ? (
                        <div className="w-full p-1 self-center text-center">
                          <label htmlFor="file" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            Subir nueva portada
                            <input type="file"
                              name="file"
                              id="file"
                              onChange={handlePortadaChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="w-full p-1 self-center text-center">
                          <div className="flex flex-col items-center justify-center text-center">
                            <br />
                            <img src={mostrarPortada} width={100} height={200} alt="Portada" />
                            <p>{portada.name}</p>
                            <button onClick={handlePortadaRemove} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Eliminar archivo</button>
                          </div>
                        </div>
                      )
                    }
                  </div>
                )
              }
            </div>

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
      <Modal isVisible={showModalDelete} onClose={() => setShowModalDelete(false)}>
        <div className=" p-6">
          <h3 className="text-xl font-semibold">Eliminar Libro</h3>
          <h3 className="mt-5 text-lg text-center font-semibold">
            ¿Desea eliminar el libro: {selectedItemTitulo}?
          </h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              delLibro(selectedItemId);
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

export default Libros;
