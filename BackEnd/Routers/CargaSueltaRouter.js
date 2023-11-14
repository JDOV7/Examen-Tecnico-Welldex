import express from "express";
import { descargarCargaSuelta } from "../Controllers/CargaSueltaController.js";
import { ValidarExisteCargaSuelta } from "../Middlewares/Validaciones/index.js";

const cargaSueltaRouter = express.Router();

cargaSueltaRouter.put(
  "/descargar/:IdCargaSuelta",
  ValidarExisteCargaSuelta,
  descargarCargaSuelta
);

export default cargaSueltaRouter;
