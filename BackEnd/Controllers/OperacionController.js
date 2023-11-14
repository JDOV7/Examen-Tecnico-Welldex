import {
  Operacion,
  Exportacion,
  Importacion,
} from "../Models/Objectos/index.js";
import { CrearContenedoresObjectos } from "../Middlewares/CrearObjectos/index.js";
import { CrearCargaSueltaObjectos } from "../Middlewares/CrearObjectos/index.js";
import {
  TipoDeDatoIncorrectoError,
  OperacionFallidaError,
} from "../Errors/index.js";
import clienteAxios from "../Configurations/axios.js";

const crearOperacionDeContenedores = async (req, res) => {
  try {
    const {
      body: {
        operacion: {
          nombreOperacion,
          operacionAduaneraPedimento,
          IdCliente,
          IdAduana,
          operacionAduaneraPatente,
          IdtipoMercancia,
          IdTipoOperacion,
          fecha,
          pais,
        },
        contenedores,
      },
    } = req;
    let tipoOperacionObjecto;
    if (nombreOperacion === "Importación") {
      tipoOperacionObjecto = new Importacion(
        operacionAduaneraPedimento,
        IdCliente,
        IdAduana,
        operacionAduaneraPatente,
        IdtipoMercancia,
        IdTipoOperacion,
        fecha,
        pais
      );
    } else if (nombreOperacion === "Exportación") {
      tipoOperacionObjecto = new Exportacion(
        operacionAduaneraPedimento,
        IdCliente,
        IdAduana,
        operacionAduaneraPatente,
        IdtipoMercancia,
        IdTipoOperacion,
        fecha,
        pais
      );
    }

    const contedoresObj = await CrearContenedoresObjectos(contenedores);
    const crearContenedores = await tipoOperacionObjecto.crearOperacion(
      contedoresObj
    );

    if (!crearContenedores) {
      throw new Error();
    }

    return res.status(201).json({
      status: 201,
      message: "Operacion creada correctamente",
      data: { operacion: tipoOperacionObjecto.toString() },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Error en el servidor", data: {} });
  }
};

const crearOperacionDeCargaSuelta = async (req, res) => {
  try {
    const {
      body: {
        operacion: {
          nombreOperacion,
          operacionAduaneraPedimento,
          IdCliente,
          IdAduana,
          operacionAduaneraPatente,
          IdtipoMercancia,
          IdTipoOperacion,
          fecha,
          pais,
        },
        cargaSuelta,
      },
    } = req;
    let tipoOperacionObjecto;
    if (nombreOperacion === "Importación") {
      tipoOperacionObjecto = new Importacion(
        operacionAduaneraPedimento,
        IdCliente,
        IdAduana,
        operacionAduaneraPatente,
        IdtipoMercancia,
        IdTipoOperacion,
        fecha,
        pais
      );
    } else if (nombreOperacion === "Exportación") {
      tipoOperacionObjecto = new Exportacion(
        operacionAduaneraPedimento,
        IdCliente,
        IdAduana,
        operacionAduaneraPatente,
        IdtipoMercancia,
        IdTipoOperacion,
        fecha,
        pais
      );
    }

    const cargasSueltas = await CrearCargaSueltaObjectos(cargaSuelta);
    const crearCargarSueltas = await tipoOperacionObjecto.crearCargaSuelta(
      cargasSueltas
    );

    if (!crearCargarSueltas) {
      throw new Error();
    }

    return res.status(201).json({
      status: 201,
      message: "Operacion de carga suelta creada correctamente",
      data: { operacion: tipoOperacionObjecto.toString() },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ status: 500, message: "Error en el servidor", data: {} });
  }
};

const obtenerTodasLasOperaciones = async (req, res) => {
  try {
    const operacionesobje = new Operacion();
    const operacionesDatos = await operacionesobje.obtenerTodasLasOperaciones();
    return res.status(200).json({
      status: 200,
      message: "Operaciones",
      data: {
        operaciones: operacionesDatos.data.operaciones,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: 500, message: "Error en el servidor", data: {} });
  }
};

const informacionParaElFormularioOperacion = async (req, res) => {
  try {
    const operacion = new Operacion();
    const datos = await operacion.informacionFormulario();
    return res.status(200).json({
      status: 200,
      message: "Info formulario aws",
      data: { datos },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Error en el servidor",
      data: {},
    });
  }
};

const obtenerOperacion = async (req, res) => {
  try {
    const { IdOperacionAduanera } = req.params;
    const operacion = new Operacion();
    operacion.IdOperacion = IdOperacionAduanera;
    const respuesta = await operacion.obtenerOperacion();

    if (!respuesta.status) {
      throw new Error();
    }

    return res.status(200).json({
      status: 200,
      message: "Info formulario",
      data: { respuesta },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Error en el servidor",
      data: {},
    });
  }
};

const actualizarEstadoAEspera = async (req, res) => {
  try {
    const {
      body: {
        operacion: { IdOperacionAduanera, operacionAduaneraEstatus },
        fecha,
      },
    } = req;

    if (operacionAduaneraEstatus === "Descargo") {
      throw new TipoDeDatoIncorrectoError("Esta operacion ya fue descargada");
    }

    const operacion = new Operacion();
    operacion.IdOperacion = IdOperacionAduanera;
    operacion.estatus = "Espera";

    const { status: statusRespuesta } = await operacion.cambiarEstadoAEspera(
      fecha
    );

    if (!statusRespuesta) {
      throw new OperacionFallidaError("Error al intentar cambiar el estado");
    }

    return res.status(200).json({
      status: 200,
      message: "Estado y Fecha cambiados",
      data: {},
    });
  } catch (error) {
    console.log(error);

    let message = "Error en el servidor";

    if (error instanceof TipoDeDatoIncorrectoError) {
      message = error.message;
    }

    if (error instanceof OperacionFallidaError) {
      message = error.message;
    }
    return res.status(500).json({
      status: 500,
      message,
      data: {},
    });
  }
};

export {
  crearOperacionDeContenedores,
  crearOperacionDeCargaSuelta,
  obtenerTodasLasOperaciones,
  informacionParaElFormularioOperacion,
  obtenerOperacion,
  actualizarEstadoAEspera,
};
