import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../Configuration/axios";
import { Link, useNavigate } from "react-router-dom";

function TablaOperaciones() {
  const [operacionesRes, setOperacionesRes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerDatos = async () => {
      const operaciones = await obtenerOperaciones();
      setOperacionesRes(operaciones);
    };
    obtenerDatos();
  }, []);

  const cambiarAEsperar = async (IdOperacionAduanera) => {
    try {
      const { value: fecha } = await Swal.fire({
        title: "Nueva Fecha",
        input: "date",
        inputLabel: "Fecha para actualizar",
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return "Algo salio mal";
          }
        },
      });
      if (!fecha) {
        return;
      }

      const url = `/operaciones/operacion/${IdOperacionAduanera}`;
      const respuesta = await clienteAxios.put(url, { fecha });
      if (respuesta.data.status != 200) {
        throw new Error();
      }
      Swal.fire({
        icon: "success",
        text: "Cambiado correctamente ",
      });
      // navigate("/");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);

      console.log(respuesta.data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error, no se pudo cambiar el estado y fecha",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  // if (operacionesRes.length == 0) {
  //   <>
  //     <span class="loader"></span>
  //   </>;
  // }

  const obtenerOperaciones = async () => {
    try {
      const url = "/operaciones/operacion";
      const operaciones = await clienteAxios.get(url);
      const ope = operaciones.data?.data?.operaciones;
      return ope;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el servidor",
        // footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  // const

  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Operaciones
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Folio
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Aduana
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Operacion
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Mercancia
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pedimento
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Patente
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Pais
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Estatus
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {operacionesRes.length >= 1 ? (
                    <>
                      {operacionesRes.map((operacion) => {
                        const {
                          IdOperacionAduanera,
                          Aduana: { aduanaNombre },
                          Cliente: { clienteNombres },
                          tipoOperacion: { tipoOperacionNombre },
                          tipoMercancium: { tipoMercanciaNombre },
                          operacionAduaneraPedimento,
                          operacionAduaneraPatente,
                          operacionAduaneraEstatus,
                          operacionAduaneraPais,
                          operacionAduaneraFecha,
                        } = operacion;
                        return (
                          <tr
                            key={IdOperacionAduanera}
                            className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                          >
                            <td className="whitespace-nowrap  font-medium">
                              {operacionAduaneraEstatus != "Descargo" ? (
                                <>
                                  <Link
                                    to={`descargar/${IdOperacionAduanera}`}
                                    className="bg-blue-600  font-bold rounded-lg p-2 m-2 "
                                  >
                                    Descargar
                                  </Link>
                                  {operacionAduaneraEstatus != "Espera" ? (
                                    <>
                                      <Link
                                        className="bg-orange-600  font-bold rounded-lg p-2  "
                                        onClick={async (e) => {
                                          e.preventDefault();
                                          await cambiarAEsperar(
                                            IdOperacionAduanera
                                          );
                                        }}
                                      >
                                        Esperar
                                      </Link>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {IdOperacionAduanera}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {aduanaNombre}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {clienteNombres}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {tipoOperacionNombre}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {tipoMercanciaNombre}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {operacionAduaneraPedimento}
                            </td>{" "}
                            <td className="whitespace-nowrap px-6 py-4">
                              {operacionAduaneraPatente}
                            </td>{" "}
                            <td className="whitespace-nowrap px-6 py-4">
                              {operacionAduaneraPais}
                            </td>{" "}
                            <td className="whitespace-nowrap px-6 py-4">
                              {operacionAduaneraFecha}
                            </td>{" "}
                            <td className="whitespace-nowrap px-6 py-4">
                              {operacionAduaneraEstatus}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
              {operacionesRes.length === 0 ? (
                <>
                  <div className="py-10">
                    <div className="flex items-center justify-center">
                      <span className="loader"></span>
                    </div>
                    <h1 className="text-center font-bold p-10 text-3xl">
                      Sin Operaciones Creadas
                    </h1>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TablaOperaciones;
