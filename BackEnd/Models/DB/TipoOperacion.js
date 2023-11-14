import { DataTypes } from "sequelize";
import db from "../../Configurations/db.js";

const TipoOperacion = db.define(
  "tipoOperacion",
  {
    IdTipoOperacion: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    tipoOperacionNombre: { type: DataTypes.STRING },
  },
  {
    tableName: "tipoOperacion",
  }
);

export default TipoOperacion;
