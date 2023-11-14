import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import FormularioOperacion from "../Components/FormularioOperacion";
import clienteAxios from "../../Configuration/axios";

function CrearOperacionCargaSuelta() {
  const [aduana, setAduana] = useState("");
  const [cliente, setCliente] = useState("");
  const [tipoOperacion, setTipoOperacion] = useState("");
  const [tipoMercancia, setTipoMercancia] = useState("");
  const [pedimento, setPedimento] = useState("");
  const [patente, setPatente] = useState("");
  const [pais, setPais] = useState("");
  const [fecha, setFecha] = useState("");
  const [inputs, setInputs] = useState([]);
  const [contenidos, setContenidos] = useState({});

  const crearOperacionCargaSuelta = async () => {
    try {
      const operacion = {
        IdAduana: aduana,
        IdCliente: cliente,
        IdTipoOperacion: tipoOperacion,
        IdtipoMercancia: tipoMercancia,
        operacionAduaneraPedimento: pedimento,
        operacionAduaneraPatente: patente,
        pais,
        fecha,
      };

      const evaluarOperacion = validarDatosOperacion(operacion);

      if (!evaluarOperacion) {
        throw new Error();
      }

      const cargaSuelta = [];

      for (const cont in contenidos) {
        const {
          cargaSueltaDescripcion,
          cargaSueltaCantidad,
          cargaSueltaFechaDescargo,
        } = contenidos[cont];
        cargaSuelta.push({
          cargaSueltaDescripcion,
          cargaSueltaCantidad,
          cargaSueltaFechaDescargo,
        });
      }

      const resCargas = validarDatosCargas(cargaSuelta);

      if (!resCargas) {
        throw new Error();
      }

      const url = `/operaciones/operacion/carga-suelta`;
      const respuesta = await clienteAxios.post(url, {
        operacion,
        cargaSuelta,
      });

      Swal.fire({
        icon: "success",
        title: "Operacion creada",
        text: "Creado Correctamente",
      });

      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el servidor",
      });
    }
  };

  const validarDatosCargas = (cargas) => {
    try {
      // const contenedores = [];

      if (!cargas || cargas.length == 0) {
        throw new Error();
      }

      for (const cont in cargas) {
        const {
          cargaSueltaDescripcion,
          cargaSueltaCantidad,
          cargaSueltaFechaDescargo,
        } = cargas[cont];

        if (
          !cargaSueltaDescripcion ||
          !cargaSueltaCantidad ||
          !cargaSueltaFechaDescargo ||
          cargaSueltaDescripcion.length < 5
        ) {
          throw new Error();
        }

        if (parseInt(cargaSueltaCantidad) < 1) {
          throw new Error();
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const validarDatosOperacion = (operacion) => {
    try {
      if (
        !operacion.IdAduana ||
        !operacion.IdCliente ||
        !operacion.IdTipoOperacion ||
        !operacion.IdtipoMercancia ||
        !operacion.operacionAduaneraPedimento ||
        !operacion.operacionAduaneraPatente ||
        !operacion.pais ||
        !operacion.fecha
      ) {
        throw new Error();
      }

      if (
        operacion.IdAduana.length != 36 ||
        operacion.IdCliente.length != 36 ||
        operacion.IdTipoOperacion.length != 36 ||
        operacion.IdtipoMercancia.length != 36 ||
        operacion.operacionAduaneraPedimento.length < 5 ||
        operacion.operacionAduaneraPatente.length < 5 ||
        operacion.pais == "Escoge un pais"
      ) {
        throw new Error();
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  // Función para agregar un nuevo input
  const agregarInput = () => {
    const nuevoId = Date.now();
    setInputs([...inputs, nuevoId]);
    setContenidos({
      ...contenidos,
      [nuevoId]: {
        cargaSueltaDescripcion: "",
        cargaSueltaCantidad: "",
        cargaSueltaFechaDescargo: "",
      },
    });
  };

  // Función para eliminar un input por su ID
  const eliminarInput = (id) => {
    const nuevosInputs = inputs.filter((inputId) => inputId !== id);
    setInputs(nuevosInputs);

    // Eliminar el contenido asociado al input
    const { [id]: omitido, ...nuevosContenidos } = contenidos;
    setContenidos(nuevosContenidos);
  };

  // Función para manejar cambios en el contenido del input
  const manejarCambioContenido = (id, valor) => {
    setContenidos({ ...contenidos, [id]: valor });
  };

  return (
    <>
      <Header></Header>
      <div className="px-10 py-20">
        <div className="py-5 text-center">
          <h1 className="text-3xl">Crear Operacion Carga Suelta</h1>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
          <div className="col-span-1">
            <FormularioOperacion
              setAduana={setAduana}
              setCliente={setCliente}
              setTipoOperacion={setTipoOperacion}
              setTipoMercancia={setTipoMercancia}
              pedimento={pedimento}
              setPedimento={setPedimento}
              patente={patente}
              setPatente={setPatente}
              setPais={setPais}
              setFecha={setFecha}
              tipoMercanciaBuscar={"Carga suelta"}
            ></FormularioOperacion>
          </div>
          <div className="col-span-1">
            <div>
              <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4">
                <div className="p-4 col-span-1">
                  <button
                    onClick={agregarInput}
                    className=" bg-principal text-black bg-blue-600 text-center font-bold rounded-lg p-2"
                  >
                    Agregar Carga
                  </button>
                </div>
                <div className="p-4 col-span-1">
                  <button
                    onClick={crearOperacionCargaSuelta}
                    className=" bg-principal text-black bg-orange-600 text-center font-bold rounded-lg p-2"
                  >
                    Guardar
                  </button>
                </div>
              </div>

              {inputs.map((inputId) => (
                <div
                  key={inputId}
                  className="bg-blue-100 m-4 p-4 rounded-3xl shadow-2xl"
                >
                  <div>
                    <div className="py-2 font-bold">
                      <h1>Descripcion</h1>
                    </div>
                    <div>
                      <textarea
                        cols="50"
                        rows="5"
                        value={contenidos[inputId].cargaSueltaDescripcion}
                        onChange={(e) =>
                          manejarCambioContenido(inputId, {
                            cargaSueltaDescripcion: e.target.value,
                            cargaSueltaCantidad:
                              contenidos[inputId].cargaSueltaCantidad,
                            cargaSueltaFechaDescargo:
                              contenidos[inputId].cargaSueltaFechaDescargo,
                          })
                        }
                      ></textarea>
                    </div>
                  </div>

                  <div>
                    <div className="py-2 font-bold">
                      <h1>Cantidad</h1>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full rounded-xl p-2"
                        value={contenidos[inputId].cargaSueltaCantidad}
                        onChange={(e) =>
                          manejarCambioContenido(inputId, {
                            cargaSueltaDescripcion:
                              contenidos[inputId].cargaSueltaDescripcion,
                            cargaSueltaCantidad: e.target.value,
                            cargaSueltaFechaDescargo:
                              contenidos[inputId].cargaSueltaFechaDescargo,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div className="py-2 font-bold">
                      <h1>Fecha Descargo</h1>
                    </div>
                    <div>
                      <input
                        type="date"
                        className="w-full rounded-xl p-2"
                        value={contenidos[inputId].cargaSueltaFechaDescargo}
                        onChange={(e) =>
                          manejarCambioContenido(inputId, {
                            cargaSueltaDescripcion:
                              contenidos[inputId].cargaSueltaDescripcion,
                            cargaSueltaCantidad:
                              contenidos[inputId].cargaSueltaCantidad,
                            cargaSueltaFechaDescargo: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => eliminarInput(inputId)}
                      className="rounded-full bg-black text-white font-extrabold p-2 hover:cursor-pointer  "
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CrearOperacionCargaSuelta;
