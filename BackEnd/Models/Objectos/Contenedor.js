import { ContenedorBD } from "../DB/index.js";
import db from "../../Configurations/db.js";
class Contenedor {
  #IdContenedor;
  #IdOperacion;
  #tipoDeContenedor;
  #dimensionAlto;
  #dimensionAncho;
  #fechaDeDescargo;
  #estado;

  constructor(
    tipoDeContenedor,
    dimensionAlto,
    dimensionAncho,
    fechaDeDescargo
  ) {
    this.#IdContenedor = "";
    this.#IdOperacion = "";
    this.#tipoDeContenedor = tipoDeContenedor;
    this.#dimensionAlto = dimensionAlto;
    this.#dimensionAncho = dimensionAncho;
    this.#fechaDeDescargo = fechaDeDescargo;
    this.#estado = "Alta";
  }

  async crearContenedor(transaction) {
    try {
      const contenedor = await ContenedorBD.create(
        {
          IdOperacionAduanera: this.#IdOperacion,
          contenedorTipo: this.tipoDeContenedor,
          contenedorAncho: this.dimensionAncho,
          contenedorAlto: this.dimensionAlto,
          contenedorFechaDescargo: this.fechaDeDescargo,
          contenedorEstado: this.estado,
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

  async actualizarContenedor() {
    const transaction = await db.transaction();
    try {
      console.log(this.toString());
      const contenedor = await ContenedorBD.update(
        {
          contenedorTipo: this.tipoDeContenedor,
          contenedorAncho: this.dimensionAncho,
          contenedorAlto: this.dimensionAlto,
          contenedorFechaDescargo: new Date(this.fechaDeDescargo),
          contenedorEstado: this.estado,
        },
        {
          where: {
            IdContenedor: this.IdContenedor,
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
    return `Contenedor: IdContenedor: ${this.IdContenedor}, IdOperacion: ${this.IdOperacion}, tipoDeContenedor: ${this.tipoDeContenedor}, dimensionAlto: ${this.dimensionAlto}, dimensionAncho: ${this.dimensionAncho}, fechaDeDescargo: ${this.fechaDeDescargo}, estado: ${this.estado}`;
  }

  set IdContenedor(IdContenedor) {
    this.#IdContenedor = IdContenedor;
  }

  get IdContenedor() {
    return this.#IdContenedor;
  }

  set IdOperacion(IdOperacion) {
    this.#IdOperacion = IdOperacion;
  }

  get IdOperacion() {
    return this.#IdOperacion;
  }

  set tipoDeContenedor(tipoDeContenedor) {
    this.#tipoDeContenedor = tipoDeContenedor;
  }

  get tipoDeContenedor() {
    return this.#tipoDeContenedor;
  }

  set dimensionAlto(dimensionAlto) {
    this.#dimensionAlto = dimensionAlto;
  }

  get dimensionAlto() {
    return this.#dimensionAlto;
  }

  set dimensionAncho(dimensionAncho) {
    this.#dimensionAncho = dimensionAncho;
  }

  get dimensionAncho() {
    return this.#dimensionAncho;
  }

  set fechaDeDescargo(fechaDeDescargo) {
    this.#fechaDeDescargo = fechaDeDescargo;
  }

  get fechaDeDescargo() {
    return this.#fechaDeDescargo;
  }

  set estado(estado) {
    this.#estado = estado;
  }

  get estado() {
    return this.#estado;
  }
}

export default Contenedor;
