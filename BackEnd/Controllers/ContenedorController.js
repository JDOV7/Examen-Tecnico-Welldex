import { Contenedor, Operacion } from "../Models/Objectos/index.js";
import { OperacionFallidaError } from "../Errors/index.js";

const descargarContenedor = async (req, res) => {
  try {
    const {
      params: { IdContenedor },
      body: {
        contenedor: {
          IdContenedor: IdCont,
          contenedorTipo,
          contenedorAncho,
          contenedorAlto,
          contenedorFechaDescargo,
          IdOperacionAduanera,
        },
      },
    } = req;

    const contenedorObj = new Contenedor(
      contenedorTipo,
      contenedorAlto,
      contenedorAncho,
      contenedorFechaDescargo
    );

    contenedorObj.IdContenedor = IdCont;
    contenedorObj.IdOperacion = IdOperacionAduanera;
    contenedorObj.estado = "Descargo";

    const contenedorActualizado = await contenedorObj.actualizarContenedor();

    if (!contenedorActualizado) {
      throw new OperacionFallidaError("El contenedor no se pudo acutalizar");
    }

    const operacion = new Operacion();
    operacion.IdOperacion = IdOperacionAduanera;

    const operacionActualizada =
      await operacion.actualizarEstadoADescargadoContenedores();

    let message = "Contenedor descagado correctamente";
    if (operacionActualizada.status && !operacionActualizada.error) {
      message = "Contenedor y Operacion descagados correctamente";
    }

    return res.status(200).json({
      status: 200,
      message,
      data: { IdContenedor, contenedor: contenedorObj.toString() },
    });
  } catch (error) {
    console.log(error);
    let message = "Error en el servidor";
    if (error instanceof OperacionFallidaError) {
      message = error.message;
    }
    return res.status(500).json({ status: 500, message, data: {} });
  }
};

export { descargarContenedor };
