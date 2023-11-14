import { Contenedor } from "../../Models/Objectos/index.js";
const CrearContenedoresObjectos = async (infoContenedores = []) => {
  const contenedores = [];
  infoContenedores.forEach((contenedor) => {
    console.log(contenedor);
    const {
      contenedorTipo,
      contenedorAlto,
      contenedorAncho,
      contenedorFechaDescargo,
    } = contenedor;
    const contenedorObjecto = new Contenedor(
      contenedorTipo,
      contenedorAlto,
      contenedorAncho,
      contenedorFechaDescargo
    );
    contenedores.push(contenedorObjecto);
  });

  return contenedores;
};

export default CrearContenedoresObjectos;
