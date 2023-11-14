import { CargaSuelta } from "../../Models/Objectos/index.js";
const CrearCargaSueltaObjectos = async (infoCargaSueltas = []) => {
  const cargasSueltas = [];
  infoCargaSueltas.forEach((cargaSuelta) => {
    const {
      cargaSueltaDescripcion,
      cargaSueltaCantidad,
      cargaSueltaFechaDescargo,
    } = cargaSuelta;
    const cargaSueltaObjecto = new CargaSuelta(
      cargaSueltaDescripcion,
      cargaSueltaCantidad,
      cargaSueltaFechaDescargo
    );
    cargasSueltas.push(cargaSueltaObjecto);
  });

  return cargasSueltas;
};

export default CrearCargaSueltaObjectos;
