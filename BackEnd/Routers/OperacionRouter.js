import express from "express";
import {
  crearOperacionDeContenedores,
  crearOperacionDeCargaSuelta,
  obtenerTodasLasOperaciones,
  informacionParaElFormularioOperacion,
  obtenerOperacion,
  actualizarEstadoAEspera,
} from "../Controllers/OperacionController.js";
import { crearOperacion } from "../Middlewares/CrearObjectos/index.js";
import {
  ValidarOperacionDeContenedores,
  ValidarOperacionDeCargaSuelta,
  ValidarExisteOperacion,
} from "../Middlewares/Validaciones/index.js";
const operacionRouter = express.Router();

operacionRouter.post(
  "/operacion/contenedor",
  crearOperacion,
  ValidarOperacionDeContenedores,
  crearOperacionDeContenedores
);

operacionRouter.post(
  "/operacion/carga-suelta",
  crearOperacion,
  ValidarOperacionDeCargaSuelta,
  crearOperacionDeCargaSuelta
);

operacionRouter.get("/operacion", obtenerTodasLasOperaciones);

operacionRouter.get(
  "/operacion/formulario-info",
  informacionParaElFormularioOperacion
);

operacionRouter.get("/operacion/:IdOperacionAduanera", obtenerOperacion);

operacionRouter.put(
  "/operacion/:IdOperacionAduanera",
  ValidarExisteOperacion,
  actualizarEstadoAEspera
);

export default operacionRouter;
