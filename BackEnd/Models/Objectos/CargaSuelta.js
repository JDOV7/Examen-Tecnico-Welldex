import { CargaSueltaDB } from "../DB/index.js";
import db from "../../Configurations/db.js";

class CargaSuelta {
  #IdCargaSuelta;
  #IdOperacionAduanera;
  #cargaSueltaDescripcion;
  #cargaSueltaCantidad;
  #cargaSueltaCantidadPendiente;
  #cargaSueltaFechaDescargo;
  #cargaSueltaEstado;

  constructor(
    cargaSueltaDescripcion,
    cargaSueltaCantidad,
    cargaSueltaFechaDescargo
  ) {
    this.#IdCargaSuelta = "";
    this.#IdOperacionAduanera = "";
    this.#cargaSueltaDescripcion = cargaSueltaDescripcion;
    this.#cargaSueltaCantidad = cargaSueltaCantidad;
    this.#cargaSueltaFechaDescargo = cargaSueltaFechaDescargo;
    this.#cargaSueltaEstado = "Alta";
    this.#cargaSueltaCantidadPendiente = cargaSueltaCantidad;
  }

  async crearCargaSuelta(transaction) {
    try {
      const cargaSuelta = await CargaSueltaDB.create(
        {
          IdOperacionAduanera: this.#IdOperacionAduanera,
          cargaSueltaDescripcion: this.cargaSueltaDescripcion,
          cargaSueltaCantidad: this.cargaSueltaCantidad,
          cargaSueltaCantidadPendiente: this.#cargaSueltaCantidadPendiente,
          cargaSueltaFechaDescargo: this.cargaSueltaFechaDescargo,
          cargaSueltaEstado: this.cargaSueltaEstado,
        },
        { transaction }
      );
      return true;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return false;
    }
  }

  async actualizarCargaSuelta() {
    const transaction = await db.transaction();
    try {
      const cargaSuelta = await CargaSueltaDB.update(
        {
          cargaSueltaDescripcion: this.cargaSueltaDescripcion,
          cargaSueltaCantidadPendiente: this.cargaSueltaCantidad,
          cargaSueltaFechaDescargo: this.cargaSueltaFechaDescargo,
          cargaSueltaEstado: this.cargaSueltaEstado,
        },
        {
          where: {
            IdCargaSuelta: this.#IdCargaSuelta,
          },
          transaction,
        }
      );

      await transaction.commit();
      return true;
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return false;
    }
  }

  toString() {
    return `Carga suelta: IdCargaSuelta: ${this.IdCargaSuelta}, IdOperacionAduanera: ${this.IdOperacionAduanera}, cargaSueltaDescripcion: ${this.cargaSueltaDescripcion}, cargaSueltaCantidad: ${this.cargaSueltaCantidad}, cargaSueltaCantidadPendiente: ${this.cargaSueltaCantidadPendiente}, cargaSueltaFechaDescargo: ${this.cargaSueltaFechaDescargo}, cargaSueltaEstado: ${this.cargaSueltaEstado}`;
  }

  set IdCargaSuelta(IdCargaSuelta) {
    this.#IdCargaSuelta = IdCargaSuelta;
  }

  get IdCargaSuelta() {
    return this.#IdCargaSuelta;
  }

  set IdOperacionAduanera(IdOperacionAduanera) {
    this.#IdOperacionAduanera = IdOperacionAduanera;
  }

  get IdOperacionAduanera() {
    return this.#IdOperacionAduanera;
  }

  set cargaSueltaDescripcion(cargaSueltaDescripcion) {
    this.#cargaSueltaDescripcion = cargaSueltaDescripcion;
  }

  get cargaSueltaDescripcion() {
    return this.#cargaSueltaDescripcion;
  }

  set cargaSueltaCantidadPendiente(cargaSueltaCantidadPendiente) {
    this.#cargaSueltaCantidadPendiente = cargaSueltaCantidadPendiente;
  }

  get cargaSueltaCantidadPendiente() {
    return this.#cargaSueltaCantidadPendiente;
  }

  set cargaSueltaCantidad(cargaSueltaCantidad) {
    this.#cargaSueltaCantidad = cargaSueltaCantidad;
  }

  get cargaSueltaCantidad() {
    return this.#cargaSueltaCantidad;
  }

  set cargaSueltaFechaDescargo(cargaSueltaFechaDescargo) {
    this.#cargaSueltaFechaDescargo = cargaSueltaFechaDescargo;
  }

  get cargaSueltaFechaDescargo() {
    return this.#cargaSueltaFechaDescargo;
  }

  set cargaSueltaEstado(cargaSueltaEstado) {
    this.#cargaSueltaEstado = cargaSueltaEstado;
  }

  get cargaSueltaEstado() {
    return this.#cargaSueltaEstado;
  }
}
export default CargaSuelta;
