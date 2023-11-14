import { TipoDeDatoIncorrectoError } from "../../Errors/index.js";
const ValidarOperacionDeContenedores = async (req, res, next) => {
  try {
    const {
      body: {
        operacion: { tipoMercanciaNombre },
      },
    } = req;

    if (tipoMercanciaNombre !== "Contenerizada") {
      throw new TipoDeDatoIncorrectoError(
        "La mercancia debe ser de tipo Contenerizada"
      );
    }
    return next();
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

export default ValidarOperacionDeContenedores;
