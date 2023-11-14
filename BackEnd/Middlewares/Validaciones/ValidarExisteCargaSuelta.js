import { EntidadNoExisteError } from "../../Errors/index.js";
import { CargaSueltaDB } from "../../Models/DB/index.js";

const ValidarExisteCargaSuelta = async (req, res, next) => {
  try {
    const {
      params: { IdCargaSuelta },
    } = req;

    const cargaSuelta = await CargaSueltaDB.findByPk(IdCargaSuelta);

    if (!cargaSuelta) {
      throw new EntidadNoExisteError("No existe la carga suelta");
    }
    req.body.cargaSuelta = cargaSuelta;

    return next();
  } catch (error) {
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      message = error.message;
    }
    return res.status(500).json({ status: 500, message, data: {} });
  }
};
export default ValidarExisteCargaSuelta;
