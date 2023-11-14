import { DataTypes } from "sequelize";
import db from "../../Configurations/db.js";

const CargaSueltaDB = db.define(
  "cargasuelta",
  {
    IdCargaSuelta: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    cargaSueltaDescripcion: { type: DataTypes.STRING },
    cargaSueltaCantidad: { type: DataTypes.INTEGER },
    cargaSueltaCantidadPendiente: { type: DataTypes.INTEGER },
    cargaSueltaFechaDescargo: { type: DataTypes.DATE },
    cargaSueltaEstado: { type: DataTypes.STRING },
  },
  {
    tableName: "cargasuelta",
  }
);

export default CargaSueltaDB;
