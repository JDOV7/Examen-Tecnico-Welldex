import { OperacionAduanera } from "../../Models/DB/index.js";
import { EntidadNoExisteError } from "../../Errors/index.js";
const ValidarExisteOperacion = async (req, res, next) => {
  try {
    const {
      params: { IdOperacionAduanera },
    } = req;

    const operacion = await OperacionAduanera.findByPk(IdOperacionAduanera);

    if (!operacion) {
      throw new EntidadNoExisteError("Esta operacion no existe");
    }

    req.body.operacion = operacion;
    next();
  } catch (error) {
    console.log(error);

    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      message = error.message;
    }
    return res.status(500).json({
      status: 500,
      message,
      data: {},
    });
  }
};

export default ValidarExisteOperacion;
