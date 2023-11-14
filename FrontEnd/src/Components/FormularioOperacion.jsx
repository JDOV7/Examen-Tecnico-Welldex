import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import clienteAxios from "../../Configuration/axios";

function FormularioOperacion({
  setAduana,
  setCliente,
  setTipoOperacion,
  setTipoMercancia,
  pedimento,
  setPedimento,
  patente,
  setPatente,
  setPais,
  setFecha,
  tipoMercanciaBuscar,
}) {
  const [datosFormulario, setDatosFormulario] = useState([]);

  useEffect(() => {
    const obtenerInfo = async () => {
      const respuesta = await obtenerInfoFormulario();
      setDatosFormulario(respuesta);
      const buscarContenerizada = respuesta[3].filter((tipoMer) => {
        return tipoMer.tipoMercanciaNombre == tipoMercanciaBuscar;
      });
      setTipoMercancia(buscarContenerizada[0].IdtipoMercancia);
    };
    obtenerInfo();
  }, []);

  const obtenerInfoFormulario = async () => {
    try {
      const url = "/operaciones/operacion/formulario-info";
      const respuesta = await clienteAxios.get(url);
      return respuesta.data?.data?.datos;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el servidor",
      });
      return [];
    }
  };

  return (
    <>
      {datosFormulario.length == 0 ? (
        <>
          {" "}
          <div className="py-10">
            <div className="flex items-center justify-center">
              <span className="loader"></span>
            </div>
            <h1 className="text-center font-bold p-10 text-3xl">
              Info no disponible
            </h1>
          </div>
        </>
      ) : (
        <>
          <div className="bg-blue-200 rounded-xl shadow-2xl py-5">
            <div className="">
              <h1 className="text-2xl font-extrabold text-center">
                Formulario Operacion
              </h1>
            </div>

            <div className="px-10 py-2">
              <div className="py-2 font-bold">
                <h1>Aduana</h1>
              </div>
              <div className="text-2xl">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 "
                  onChange={(e) => {
                    setAduana(e.target.value);
                  }}
                >
                  <option defaultValue>Escoge una opcion</option>
                  {datosFormulario[0].length >= 1 ? (
                    <>
                      {datosFormulario[0].map((aduana) => {
                        return (
                          <option key={aduana.IdAduana} value={aduana.IdAduana}>
                            {aduana.aduanaNombre}
                          </option>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>

            <div className="px-10 py-2">
              <div className="py-2 font-bold">
                <h1>Cliente</h1>
              </div>
              <div className="text-2xl">
                <select
                  name="select"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 "
                  onChange={(e) => {
                    setCliente(e.target.value);
                  }}
                >
                  <option selected>Escoge una opcion</option>
                  {datosFormulario[1].length >= 1 ? (
                    <>
                      {datosFormulario[1].map((cliente) => {
                        return (
                          <option
                            key={cliente.IdCliente}
                            value={cliente.IdCliente}
                          >
                            {cliente.clienteNombres}
                          </option>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>

            <div className="px-10 py-2">
              <div className="py-2 font-bold">
                <h1>Tipo Operacion</h1>
              </div>
              <div className="text-2xl">
                <select
                  name="select"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 "
                  onChange={(e) => {
                    setTipoOperacion(e.target.value);
                  }}
                >
                  <option selected>Escoge una opcion</option>
                  {datosFormulario[2].length >= 1 ? (
                    <>
                      {datosFormulario[2].map((tipoOpe) => {
                        return (
                          <option
                            key={tipoOpe.IdTipoOperacion}
                            value={tipoOpe.IdTipoOperacion}
                          >
                            {tipoOpe.tipoOperacionNombre}
                          </option>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </select>
              </div>
            </div>

            <div className="px-10 py-2">
              <div className="py-2 font-bold">
                <h1>Pedimento</h1>
              </div>
              <div className="text-base">
                <textarea
                  cols="50"
                  rows="5"
                  value={pedimento}
                  onChange={(e) => {
                    setPedimento(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>

            <div className="px-10 py-2">
              <div className="py-2 font-bold">
                <h1>Patente</h1>
              </div>
              <div className="text-base">
                <input
                  type="text"
                  className="w-full rounded-xl p-2"
                  value={patente}
                  onChange={(e) => {
                    setPatente(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="px-10 py-2">
              <div className="py-2 font-bold">
                <h1>Pais</h1>
              </div>
              <div className="text-base">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 "
                  onChange={(e) => {
                    setPais(e.target.value);
                  }}
                >
                  <option selected>Escoge un pais</option>
                  <option value="MX">Mexico</option>
                  <option value="US">Estados Unidos</option>
                  <option value="ES">España</option>
                </select>
              </div>
            </div>

            <div className="px-10 py-2">
              <div className="py-2 font-bold">
                <h1>Fecha</h1>
              </div>
              <div>
                <input
                  type="date"
                  className="p-2 w-full rounded-lg"
                  onChange={(e) => {
                    setFecha(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default FormularioOperacion;
