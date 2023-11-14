import { DataTypes } from "sequelize";
import db from "../../Configurations/db.js";

const OperacionAduanera = db.define(
  "operacionaduanera",
  {
    IdOperacionAduanera: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    operacionAduaneraPedimento: { type: DataTypes.STRING },
    operacionAduaneraPatente: { type: DataTypes.STRING },
    operacionAduaneraEstatus: { type: DataTypes.STRING },
    operacionAduaneraPais: { type: DataTypes.STRING },
    operacionAduaneraFecha: { type: DataTypes.STRING },
  },
  {
    tableName: "operacionaduanera",
  }
);

export default OperacionAduanera;
