import { DataTypes } from "sequelize";
import db from "../../Configurations/db.js";

const Aduana = db.define(
  "Aduana",
  {
    IdAduana: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    aduanaNombre: { type: DataTypes.STRING },
    aduanaEstado: { type: DataTypes.STRING },
  },
  {
    tableName: "Aduana",
  }
);

export default Aduana;
