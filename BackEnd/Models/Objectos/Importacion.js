import Operacion from "./Operacion.js";
import Contenedor from "./Contenedor.js";
import { OperacionAduanera } from "../DB/index.js";
import db from "../../Configurations/db.js";
class Importacion extends Operacion {
  #fechaDeArribo;
  #paisDeOrigen;

  constructor(
    pedimento,
    cliente,
    aduana,
    patente,
    tipo_Mercancia,
    tipo_operacion,
    fechaDeArribo,
    paisDeOrigen
  ) {
    super(pedimento, cliente, aduana, patente, tipo_Mercancia, tipo_operacion);

    this.#fechaDeArribo = fechaDeArribo;
    this.#paisDeOrigen = paisDeOrigen;
    // this.tipo_operacion = "Importación";
  }

  async crearOperacion(contenedores = []) {
    const transaction = await db.transaction();
    try {
      const crearOperacion = await OperacionAduanera.create(
        {
          IdAduana: this.aduana,
          IdCliente: this.cliente,
          IdTipoOperacion: this.tipo_operacion,
          IdtipoMercancia: this.tipo_Mercancia,
          operacionAduaneraPedimento: this.pedimento,
          operacionAduaneraPatente: this.patente,
          operacionAduaneraEstatus: this.estatus,
          operacionAduaneraPais: this.paisDeOrigen,
          operacionAduaneraFecha: this.fechaDeArribo,
        },
        { transaction }
      );
      // console.log(crearOperacion.IdOperacionAduanera);
      for (const contenedor of contenedores) {
        contenedor.IdOperacion = crearOperacion.IdOperacionAduanera;
        const estadoContenedor = await contenedor.crearContenedor(transaction);
        if (!estadoContenedor) {
          throw new Error();
        }
      }
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      return false;
    }
  }

  async crearCargaSuelta(cargasSueltas = []) {
    const transaction = await db.transaction();
    try {
      const crearOperacion = await OperacionAduanera.create(
        {
          IdAduana: this.aduana,
          IdCliente: this.cliente,
          IdTipoOperacion: this.tipo_operacion,
          IdtipoMercancia: this.tipo_Mercancia,
          operacionAduaneraPedimento: this.pedimento,
          operacionAduaneraPatente: this.patente,
          operacionAduaneraEstatus: this.estatus,
          operacionAduaneraPais: this.paisDeOrigen,
          operacionAduaneraFecha: this.fechaDeArribo,
        },
        { transaction }
      );
      // console.log(crearOperacion.IdOperacionAduanera);
      for (const cargaSuelta of cargasSueltas) {
        cargaSuelta.IdOperacionAduanera = crearOperacion.IdOperacionAduanera;
        const estadoCargaSuelta = await cargaSuelta.crearCargaSuelta(
          transaction
        );
        if (!estadoCargaSuelta) {
          throw new Error();
        }
      }
      await transaction.commit();
      return true;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return false;
    }
  }

  toString() {
    return `Import: Pedimento: ${this.pedimento}, cliente: ${this.cliente}, aduana: ${this.aduana}, patente: ${this.patente}, tipo_Mercancia: ${this.tipo_Mercancia}, tipo_operacion: ${this.tipo_operacion}, estatus: ${this.estatus}, fechaDeArribo: ${this.fechaDeArribo}, paisDeOrigen: ${this.paisDeOrigen}`;
  }

  set fechaDeArribo(fechaDeArribo) {
    this.#fechaDeArribo = fechaDeArribo;
  }
  get fechaDeArribo() {
    return this.#fechaDeArribo;
  }

  set paisDeOrigen(paisDeOrigen) {
    this.#paisDeOrigen = paisDeOrigen;
  }
  get paisDeOrigen() {
    return this.#paisDeOrigen;
  }
}

export default Importacion;
