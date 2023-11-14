import TipoDeDatoIncorrectoError from "../../Errors/TipoDeDatoIncorrectoError.js";
import { OperacionJOI, ContenedorJOI } from "../../Models/JOI/index.js";
const ValidarCrearOperacionContenedor = async (req, res, next) => {
  try {
    const { operacion, contenedores } = req.body;
    const { error } = OperacionJOI.validate(operacion);

    if (error) {
      console.log(error.details);
      throw new TipoDeDatoIncorrectoError("Datos equivocados");
    }

    if (contenedores.length <= 0) {
      throw new TipoDeDatoIncorrectoError("Datos equivocados");
    }
    contenedores.map((cont) => {
      const { error: errorC } = ContenedorJOI.validate(cont);

      if (errorC) {
        console.log(errorC.details);
        throw new TipoDeDatoIncorrectoError("Datos equivocados");
      }
    });

    next();
  } catch (error) {
    console.log(error);
    let message = "Error en el servidor";
    if (error instanceof TipoDeDatoIncorrectoError) {
      message = error.message;
    }
    return res.status(500).json({
      status: 500,
      message,
      data: {},
    });
  }
};

export default ValidarCrearOperacionContenedor;
