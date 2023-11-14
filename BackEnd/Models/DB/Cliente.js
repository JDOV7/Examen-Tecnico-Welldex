import { DataTypes } from "sequelize";
import db from "../../Configurations/db.js";

const Cliente = db.define(
  "Cliente",
  {
    IdCliente: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    clienteNombres: { type: DataTypes.STRING },
    clienteCorreo: { type: DataTypes.STRING },
  },
  {
    tableName: "Cliente",
  }
);

export default Cliente;
