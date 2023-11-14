import {
  Aduana,
  Cliente,
  TipoOperacion,
  TipoMercancia,
} from "../../Models/DB/index.js";
import { EntidadNoExisteError } from "../../Errors/index.js";

const crearOperacion = async (req, res, next) => {
  try {
    const {
      body: {
        operacion: {
          IdAduana,
          IdCliente,
          IdTipoOperacion,
          IdtipoMercancia,
          operacionAduaneraPedimento,
          operacionAduaneraPatente,
          pais,
          fecha,
        },
      },
    } = req;
    const [aduana, cliente, tipoOperacion, tipoMercancia] = await Promise.all([
      Aduana.findByPk(IdAduana),
      Cliente.findByPk(IdCliente),
      TipoOperacion.findByPk(IdTipoOperacion),
      TipoMercancia.findByPk(IdtipoMercancia),
    ]);

    if (!aduana) {
      throw new EntidadNoExisteError("Aduana no existe");
    }

    if (!cliente) {
      throw new EntidadNoExisteError("Cliente no existe");
    }

    if (!tipoOperacion) {
      throw new EntidadNoExisteError("Tipo de operacion no existe");
    }

    if (!tipoMercancia) {
      throw new EntidadNoExisteError("Tipo de mercancia no existe");
    }

    const tipoOperaracionNombre = tipoOperacion.tipoOperacionNombre;
    const tipoMercanciaNombre = tipoMercancia.tipoMercanciaNombre;
    req.body.operacion.nombreOperacion = tipoOperaracionNombre;
    req.body.operacion.tipoMercanciaNombre = tipoMercanciaNombre;
    return next();
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

export default crearOperacion;
