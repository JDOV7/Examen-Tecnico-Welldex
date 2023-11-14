import Operacion from "./Operacion.js";
import db from "../../Configurations/db.js";
import { OperacionAduanera } from "../DB/index.js";

class Exportacion extends Operacion {
  #fechaDeZarpe;
  #paisDestino;

  constructor(
    pedimento,
    cliente,
    aduana,
    patente,
    tipo_Mercancia,
    tipo_operacion,
    fechaDeZarpe,
    paisDestino
  ) {
    super(pedimento, cliente, aduana, patente, tipo_Mercancia, tipo_operacion);

    this.#fechaDeZarpe = fechaDeZarpe;
    this.#paisDestino = paisDestino;
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
          operacionAduaneraPais: this.paisDestino,
          operacionAduaneraFecha: this.fechaDeZarpe,
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
          operacionAduaneraPais: this.#paisDestino,
          operacionAduaneraFecha: this.fechaDeZarpe,
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
    return `Export: Pedimento: ${this.pedimento}, cliente: ${this.cliente}, aduana: ${this.aduana}, patente: ${this.patente}, tipo_Mercancia: ${this.tipo_Mercancia}, tipo_operacion: ${this.tipo_operacion}, estatus: ${this.estatus}, fechaDeZarpe: ${this.fechaDeZarpe}, paisDestino: ${this.paisDestino}`;
  }

  set fechaDeZarpe(fechaDeZarpe) {
    this.#fechaDeZarpe = fechaDeZarpe;
  }
  get fechaDeZarpe() {
    return this.#fechaDeZarpe;
  }

  set paisDestino(paisDestino) {
    this.#paisDestino = paisDestino;
  }
  get paisDestino() {
    return this.#paisDestino;
  }
}

export default Exportacion;
