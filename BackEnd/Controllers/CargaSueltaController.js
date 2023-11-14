import { CargaSuelta, Operacion } from "../Models/Objectos/index.js";
import {
  TipoDeDatoIncorrectoError,
  OperacionFallidaError,
} from "../Errors/index.js";

const descargarCargaSuelta = async (req, res) => {
  try {
    const {
      body: {
        cargaSuelta: {
          IdCargaSuelta,
          cargaSueltaDescripcion,
          cargaSueltaCantidadPendiente,
          cargaSueltaFechaDescargo,
          cargaSueltaEstado,
          IdOperacionAduanera,
        },
        cantidad,
      },
    } = req;

    if (!(parseInt(cargaSueltaCantidadPendiente) >= parseInt(cantidad))) {
      throw new TipoDeDatoIncorrectoError("La cantidad no es correcta");
    }

    const nuevaCantidad =
      parseInt(cargaSueltaCantidadPendiente) - parseInt(cantidad);

    if (nuevaCantidad < 0) {
      throw new TipoDeDatoIncorrectoError("La cantidad no es correcta");
    }

    const cargaSueltaObj = new CargaSuelta(
      cargaSueltaDescripcion,
      nuevaCantidad,
      cargaSueltaFechaDescargo
    );

    cargaSueltaObj.IdCargaSuelta = IdCargaSuelta;
    cargaSueltaObj.cargaSueltaEstado =
      nuevaCantidad == 0 ? "Descargo" : cargaSueltaEstado;
    cargaSueltaObj.IdOperacionAduanera = IdOperacionAduanera;

    const cargaSueltaActualizado = await cargaSueltaObj.actualizarCargaSuelta();

    if (!cargaSueltaActualizado) {
      throw new OperacionFallidaError("La carga suelta no se pudo acutalizar");
    }

    const operacion = new Operacion();
    operacion.IdOperacion = IdOperacionAduanera;

    const operacionActualizada =
      await operacion.actualizarEstadoADescargadoCargaSuelta();

    let message = "Carga suelta descagada correctamente";
    if (operacionActualizada.status && !operacionActualizada.error) {
      message = "Carga suelta y Operacion descagadas correctamente";
    }

    return res.status(200).json({
      status: 200,
      message,
      data: { cantidad, cargaSueltaObj: cargaSueltaObj.toString() },
    });
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

export { descargarCargaSuelta };
