import express, { json } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import db from "./Configurations/db.js";
import operacionRouter from "./Routers/OperacionRouter.js";
import contenedorRouter from "./Routers/ContenedorRouter.js";
import cargaSueltaRouter from "./Routers/CargaSueltaRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs/access.log"),
  { flags: "a" }
);
app.use(morgan("combined", { stream: accessLogStream }));

dotenv.config();

try {
  await db.authenticate();
  db.sync();
  console.log("conexion correcta a la db");
} catch (error) {
  console.log(error);
}

const dominiosPermitidos = [process.env.FRONTEND_URL, "https://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true);
    // if (dominiosPermitidos.indexOf(origin) !== -1) {

    //   callback(null, true);
    // } else {
    //   callback(new Error("No permitdo por CORS"));
    // }
  },
};

app.use(cors(corsOptions));

app.use("/operaciones", operacionRouter);
app.use("/contenedores", contenedorRouter);
app.use("/cargas-sueltas", cargaSueltaRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto: ${PORT}`);
});
