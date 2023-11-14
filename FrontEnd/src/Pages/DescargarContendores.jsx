import React from "react";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import clienteAxios from "../../Configuration/axios";

function DescargarContendores({ operacion }) {
  console.log(operacion.operacion);

  const descargarContenedor = async (Id) => {
    try {
      const url = `/contenedores/descargar/${Id}`;
      const respuesta = await clienteAxios.put(url);

      Swal.fire({
        icon: "success",
        text: "Descargado correctamente",
      });

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el servidor",
      });
    }
  };

  return (
    <>
      <Header></Header>
      <div className="px-10 pt-28 ">
        <div className="py-5 text-center">
          <h1 className="text-3xl">Descargar Contenedores</h1>
        </div>
        <div>
          <table className="min-w-full text-left text-sm font-light">
            <thead className="border-b font-medium dark:border-neutral-500">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Operacion
                </th>
                <th scope="col" className="px-6 py-4">
                  ID
                </th>
                <th scope="col" className="px-6 py-4">
                  Tipo
                </th>
                <th scope="col" className="px-6 py-4">
                  Ancho
                </th>
                <th scope="col" className="px-6 py-4">
                  Alto
                </th>
                <th scope="col" className="px-6 py-4">
                  Fecha Descargo
                </th>
                <th scope="col" className="px-6 py-4">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {operacion.mercanciasContenedores.length >= 1 ? (
                <>
                  {operacion.mercanciasContenedores.map((contenedor) => {
                    const {
                      IdContenedor,
                      contenedorTipo,
                      contenedorAncho,
                      contenedorAlto,
                      contenedorFechaDescargo,
                      contenedorEstado,
                      IdOperacionAduanera,
                    } = contenedor;
                    return (
                      <tr
                        key={IdContenedor}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {contenedorEstado == "Descargo" ? (
                            <></>
                          ) : (
                            <>
                              <button
                                className="bg-blue-600  font-bold rounded-lg p-2  "
                                onClick={async (e) => {
                                  e.preventDefault();
                                  await descargarContenedor(IdContenedor);
                                }}
                              >
                                Descargar
                              </button>
                            </>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {IdContenedor}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contenedorTipo}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contenedorAncho}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contenedorAlto}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contenedorFechaDescargo}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {contenedorEstado}
                        </td>{" "}
                      </tr>
                    );
                  })}
                </>
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default DescargarContendores;
