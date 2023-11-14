import { DataTypes } from "sequelize";
import db from "../../Configurations/db.js";

const TipoMercancia = db.define(
  "tipoMercancia",
  {
    IdtipoMercancia: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    tipoMercanciaNombre: { type: DataTypes.STRING },
  },
  {
    tableName: "tipoMercancia",
  }
);

export default TipoMercancia;
