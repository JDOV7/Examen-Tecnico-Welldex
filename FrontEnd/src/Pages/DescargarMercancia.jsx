import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import clienteAxios from "../../Configuration/axios";
import DescargarCargaCargaSuelta from "./DescargarCargaCargaSuelta";
import DescargarContendores from "./DescargarContendores";

function DescargarMercancia() {
  const params = useParams();
  const [tipoMercancia, setTipoMercancia] = useState(-1);
  const [operacion, setOperacion] = useState({});
  const { IdOperacionAduanera } = params;

  useEffect(() => {
    const obtDatos = async () => {
      const respuesta = await obtenerDatosOperacion();
      //   console.log(respuesta);
      setOperacion(respuesta);
      if (respuesta.mercanciasCargasSueltas.length >= 1) {
        setTipoMercancia(1);
      } else if (respuesta.mercanciasContenedores.length >= 1) {
        setTipoMercancia(0);
      }
    };
    obtDatos();
  }, []);

  const obtenerDatosOperacion = async () => {
    try {
      const url = `/operaciones/operacion/${IdOperacionAduanera}`;
      const respuesta = await clienteAxios.get(url);
      return respuesta.data?.data?.respuesta;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error en el servidor",
      });
    }
  };

  if (tipoMercancia == 1) {
    return (
      <DescargarCargaCargaSuelta
        operacion={operacion}
      ></DescargarCargaCargaSuelta>
    );
  } else if (tipoMercancia == 0) {
    return <DescargarContendores operacion={operacion}></DescargarContendores>;
  } else {
    return (
      <>
        <h1 className="text-6xl">Error 404</h1>
      </>
    );
  }
}

export default DescargarMercancia;
