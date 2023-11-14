import { TipoDeDatoIncorrectoError } from "../../Errors/index.js";
import { OperacionJOI, CargaSueltaJOI } from "../../Models/JOI/index.js";
const ValidarCrearOperacionCargaSuelta = async (req, res, next) => {
  try {
    const { operacion, cargaSuelta } = req.body;
    const { error } = OperacionJOI.validate(operacion);

    if (error) {
      console.log(error.details);
      throw new TipoDeDatoIncorrectoError("Datos equivocados");
    }

    if (cargaSuelta.length <= 0) {
      throw new TipoDeDatoIncorrectoError("Datos equivocados");
    }
    cargaSuelta.map((carg) => {
      const { error: errorC } = CargaSueltaJOI.validate(carg);

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

export default ValidarCrearOperacionCargaSuelta;
