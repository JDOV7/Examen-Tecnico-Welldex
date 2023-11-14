import { DataTypes } from "sequelize";
import db from "../../Configurations/db.js";

const ContenedorBD = db.define(
  "contenedor",
  {
    IdContenedor: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    contenedorTipo: { type: DataTypes.STRING },
    contenedorAncho: { type: DataTypes.INTEGER },
    contenedorAlto: { type: DataTypes.INTEGER },
    contenedorFechaDescargo: { type: DataTypes.DATE },
    contenedorEstado: { type: DataTypes.STRING },
  },
  {
    tableName: "contenedor",
  }
);

export default ContenedorBD;
