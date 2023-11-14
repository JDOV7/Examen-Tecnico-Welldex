import { ContenedorBD } from "../../Models/DB/index.js";
import { EntidadNoExisteError } from "../../Errors/index.js";

const ValidarExisteContenedor = async (req, res, next) => {
  try {
    const {
      params: { IdContenedor },
    } = req;

    const contenedor = await ContenedorBD.findByPk(IdContenedor);

    if (!contenedor) {
      throw new EntidadNoExisteError("No existe este contenedor");
    }

    req.body.contenedor = contenedor;

    next();
  } catch (error) {
    let message = "Error en el servidor";
    if (error instanceof EntidadNoExisteError) {
      message = error.message;
    }
    return res.status(500).json({ status: 500, message, data: {} });
  }
};

export default ValidarExisteContenedor;
