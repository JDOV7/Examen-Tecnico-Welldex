import express from "express";
import { descargarContenedor } from "../Controllers/ContenedorController.js";
import { ValidarExisteContenedor } from "../Middlewares/Validaciones/index.js";

const contenedorRouter = express.Router();

contenedorRouter.put(
  "/descargar/:IdContenedor",
  ValidarExisteContenedor,
  descargarContenedor
);

export default contenedorRouter;
