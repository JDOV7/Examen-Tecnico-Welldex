import React from "react";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import clienteAxios from "../../Configuration/axios";

function DescargarCargaCargaSuelta({ operacion }) {
  const descargarCarga = async (Id, cargaSueltaCantidad) => {
    try {
      const { value: numero } = await Swal.fire({
        title: "Cantidad",
        input: "number",
        inputLabel: "Cantidad Piezas",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Algo salio mal";
          }
        },
      });

      if (!numero) {
        return;
      }

      if (parseInt(numero) > parseInt(cargaSueltaCantidad)) {
        throw new Error();
      }

      const url = `/cargas-sueltas/descargar/${Id}`;
      const respuesta = await clienteAxios.put(url, { cantidad: numero });

      Swal.fire({
        icon: "success",
        text: "Descargado correctamente ",
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
          <h1 className="text-3xl">Descargar Carga</h1>
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
                  Descripcion
                </th>
                <th scope="col" className="px-6 py-4">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-4">
                  Cantidad Pendiente
                </th>
                <th scope="col" className="px-6 py-4">
                  FechaDescargo
                </th>
                <th scope="col" className="px-6 py-4">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {operacion.mercanciasCargasSueltas.length >= 1 ? (
                <>
                  {operacion.mercanciasCargasSueltas.map((carga) => {
                    const {
                      IdCargaSuelta,
                      IdOperacionAduanera,
                      cargaSueltaDescripcion,
                      cargaSueltaCantidad,
                      cargaSueltaCantidadPendiente,
                      cargaSueltaFechaDescargo,
                      cargaSueltaEstado,
                    } = carga;
                    return (
                      <tr
                        key={IdCargaSuelta}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {cargaSueltaEstado == "Descargo" ? (
                            <></>
                          ) : (
                            <>
                              <button
                                className="bg-blue-600  font-bold rounded-lg p-2  "
                                onClick={async (e) => {
                                  e.preventDefault();
                                  await descargarCarga(
                                    IdCargaSuelta,
                                    cargaSueltaCantidad
                                  );
                                }}
                              >
                                Descargar
                              </button>
                            </>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {IdCargaSuelta}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cargaSueltaDescripcion}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cargaSueltaCantidad}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cargaSueltaCantidadPendiente}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cargaSueltaFechaDescargo}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {cargaSueltaEstado}
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

export default DescargarCargaCargaSuelta;
