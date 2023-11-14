import Aduana from "./Aduana.js";
import Cliente from "./Cliente.js";
import TipoOperacion from "./TipoOperacion.js";
import TipoMercancia from "./TipoMercancia.js";
import OperacionAduanera from "./OperacionAduanera.js";
import ContenedorBD from "./Contenedor.js";
import CargaSueltaDB from "./CargaSuelta.js";

OperacionAduanera.belongsTo(Aduana, { foreignKey: "IdAduana" });
OperacionAduanera.belongsTo(Cliente, { foreignKey: "IdCliente" });
OperacionAduanera.belongsTo(TipoOperacion, { foreignKey: "IdTipoOperacion" });
OperacionAduanera.belongsTo(TipoMercancia, { foreignKey: "IdtipoMercancia" });
ContenedorBD.belongsTo(OperacionAduanera, {
  foreignKey: "IdOperacionAduanera",
});
CargaSueltaDB.belongsTo(OperacionAduanera, {
  foreignKey: "IdOperacionAduanera",
});

export {
  Aduana,
  Cliente,
  TipoOperacion,
  TipoMercancia,
  OperacionAduanera,
  ContenedorBD,
  CargaSueltaDB,
};
