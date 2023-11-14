import React, { useState } from "react";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import FormularioOperacion from "../Components/FormularioOperacion";
import clienteAxios from "../../Configuration/axios";

function CrearOperacionContenedor() {
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

  const crearOperacionContenedor = async () => {
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

      const contenedores = [];

      for (const cont in contenidos) {
        const {
          contenedorTipo,
          contenedorAncho,
          contenedorAlto,
          contenedorFechaDescargo,
        } = contenidos[cont];
        contenedores.push({
          contenedorTipo,
          contenedorAncho,
          contenedorAlto,
          contenedorFechaDescargo,
        });
      }

      const resContenedores = validarDatosContenedores(contenedores);

      if (!resContenedores) {
        throw new Error();
      }

      const url = `/operaciones/operacion/contenedor`;
      const respuesta = await clienteAxios.post(url, {
        operacion,
        contenedores,
      });

      Swal.fire({
        icon: "success",
        title: "Operacion creada",
        text: "Creado Correctamente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al procesar la solicitud",
      });
    }
  };

  const validarDatosContenedores = (contenedores) => {
    try {
      // const contenedores = [];

      if (!contenedores || contenedores.length == 0) {
        throw new Error();
      }

      for (const cont in contenidos) {
        const {
          contenedorAlto,
          contenedorAncho,
          contenedorFechaDescargo,
          contenedorTipo,
        } = contenidos[cont];

        if (
          !contenedorAlto ||
          !contenedorAncho ||
          !contenedorFechaDescargo ||
          !contenedorTipo ||
          contenedorTipo == "Escoge una opcion"
        ) {
          throw new Error();
        }

        if (parseInt(contenedorAlto) < 1 || parseInt(contenedorAncho) < 1) {
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
        contenedorTipo: "",
        contenedorAncho: "",
        contenedorAlto: "",
        contenedorFechaDescargo: "",
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
          <h1 className="text-3xl">Crear Operacion Contenedor</h1>
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
              tipoMercanciaBuscar={"Contenerizada"}
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
                    Agregar Contenedor
                  </button>
                </div>
                <div className="p-4 col-span-1">
                  <button
                    onClick={crearOperacionContenedor}
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
                      <h1>Tipo</h1>
                    </div>
                    <div>
                      <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 "
                        onChange={(e) =>
                          manejarCambioContenido(inputId, {
                            contenedorTipo: e.target.value,
                            contenedorAncho:
                              contenidos[inputId].contenedorAncho,
                            contenedorAlto: contenidos[inputId].contenedorAlto,
                            contenedorFechaDescargo:
                              contenidos[inputId].contenedorFechaDescargo,
                          })
                        }
                      >
                        <option defaultValue>Escoge una opcion</option>
                        <option value="tipo1">Tipo 1</option>
                        <option value="tipo2">Tipo 2</option>
                        <option value="tipo3">Tipo 3</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <div className="py-2 font-bold">
                      <h1>Ancho</h1>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full rounded-xl p-2"
                        value={contenidos[inputId].contenedorAncho}
                        onChange={(e) =>
                          manejarCambioContenido(inputId, {
                            contenedorTipo: contenidos[inputId].contenedorTipo,
                            contenedorAncho: e.target.value,
                            contenedorAlto: contenidos[inputId].contenedorAlto,
                            contenedorFechaDescargo:
                              contenidos[inputId].contenedorFechaDescargo,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <div className="py-2 font-bold">
                      <h1>Alto</h1>
                    </div>
                    <div>
                      <input
                        type="number"
                        className="w-full rounded-xl p-2"
                        value={contenidos[inputId].contenedorAlto}
                        onChange={(e) =>
                          manejarCambioContenido(inputId, {
                            contenedorTipo: contenidos[inputId].contenedorTipo,
                            contenedorAncho:
                              contenidos[inputId].contenedorAncho,
                            contenedorAlto: e.target.value,
                            contenedorFechaDescargo:
                              contenidos[inputId].contenedorFechaDescargo,
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
                        value={contenidos[inputId].contenedorFechaDescargo}
                        onChange={(e) =>
                          manejarCambioContenido(inputId, {
                            contenedorTipo: contenidos[inputId].contenedorTipo,
                            contenedorAncho:
                              contenidos[inputId].contenedorAncho,
                            contenedorAlto: contenidos[inputId].contenedorAlto,
                            contenedorFechaDescargo: e.target.value,
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

              {/* Mostrar el contenido de los inputs no borrados */}
              <div>
                <h2>Contenido de Inputs No Borrados</h2>
                {Object.entries(contenidos).map(([id, contenido]) => (
                  <p key={id}>{`Input ${id}: ${JSON.stringify(contenido)}`}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div>{aduana}</div>
        <div>{cliente}</div>
        <div>{tipoOperacion}</div>
        <div>{pedimento}</div>
        <div>{patente}</div>
        <div>{pais}</div>
        <div>{fecha}</div>
        <div>{tipoMercancia}</div>
      </div>
    </>
  );
}

export default CrearOperacionContenedor;
