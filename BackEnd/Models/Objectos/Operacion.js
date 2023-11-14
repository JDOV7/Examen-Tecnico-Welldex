import {
  OperacionAduanera,
  ContenedorBD,
  CargaSueltaDB,
  Aduana,
  Cliente,
  TipoOperacion,
  TipoMercancia,
} from "../../Models/DB/index.js";
import db from "../../Configurations/db.js";
import clienteAxios from "../../Configurations/axios.js";
class Operacion {
  #IdOperacion;
  #pedimento;
  #cliente;
  #aduana;
  #patente;
  #tipo_Mercancia;
  #tipo_operacion;
  #estatus;

  constructor(
    pedimento,
    cliente,
    aduana,
    patente,
    tipo_Mercancia,
    tipo_operacion
  ) {
    this.#pedimento = pedimento;
    this.#cliente = cliente;
    this.#aduana = aduana;
    this.#patente = patente;
    this.#tipo_Mercancia = tipo_Mercancia;
    this.#estatus = "Alta";
    this.#tipo_operacion = tipo_operacion;
    this.#IdOperacion = "";
  }

  async obtenerOperacion() {
    try {
      const [operacion, mercanciasContenedores, mercanciasCargasSueltas] =
        await Promise.all([
          OperacionAduanera.findByPk(this.#IdOperacion),
          ContenedorBD.findAll({
            where: {
              IdOperacionAduanera: this.#IdOperacion,
            },
          }),
          CargaSueltaDB.findAll({
            where: {
              IdOperacionAduanera: this.#IdOperacion,
            },
          }),
        ]);

      if (!operacion) {
        throw new Error();
      }

      return {
        status: true,
        operacion,
        mercanciasContenedores,
        mercanciasCargasSueltas,
      };
    } catch (error) {
      console.log(error);
      return { status: false };
    }
  }

  async cambiarEstadoAEspera(fecha) {
    const transaction = await db.transaction();
    try {
      const id = this.#IdOperacion;
      // const

      const operacion = await OperacionAduanera.update(
        {
          operacionAduaneraEstatus: this.#estatus,
          operacionAduaneraFecha: fecha,
        },
        {
          where: {
            IdOperacionAduanera: id,
          },
          transaction,
        }
      );
      await transaction.commit();
      return { status: true, id, fecha };
    } catch (error) {
      await transaction.rollback();
      return { status: false };
    }
  }

  async informacionFormulario() {
    try {

      const url = "/operaciones/formulario-info";
      const respuesta = await clienteAxios.get(url);

      return respuesta.data.info;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async obtenerTodasLasOperaciones() {
    try {
      const url = "/operaciones/operaciones";
      const operaciones = await clienteAxios.get(url);

      return operaciones;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async actualizarEstadoADescargadoContenedores() {
    const transaction = await db.transaction();
    try {
      const [
        buscarTodosLosContenedoresPertenecientes,
        buscarTodosLosContenedoresPertenecientesDescargados,
      ] = await Promise.all([
        ContenedorBD.findAll({
          where: {
            IdOperacionAduanera: this.#IdOperacion,
          },
          transaction,
        }),
        ContenedorBD.findAll({
          where: {
            IdOperacionAduanera: this.#IdOperacion,
            contenedorEstado: "Descargo",
          },
          transaction,
        }),
      ]);

      if (
        buscarTodosLosContenedoresPertenecientes.length !==
        buscarTodosLosContenedoresPertenecientesDescargados.length
      ) {
        return { status: false, error: false };
      }

      const operacion = await OperacionAduanera.update(
        {
          operacionAduaneraEstatus: "Descargo",
        },
        {
          where: {
            IdOperacionAduanera: this.#IdOperacion,
          },
          transaction,
        }
      );

      await transaction.commit();
      return { status: true, error: false };
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return { status: false, error: true };
    }
  }

  async actualizarEstadoADescargadoCargaSuelta() {
    const transaction = await db.transaction();
    try {
      const [
        buscarTodosLasCargasSueltasPertenecientes,
        buscarTodosLasCargasSueltasPertenecientesDescargados,
      ] = await Promise.all([
        CargaSueltaDB.findAll({
          where: {
            IdOperacionAduanera: this.#IdOperacion,
          },
          transaction,
        }),
        CargaSueltaDB.findAll({
          where: {
            IdOperacionAduanera: this.#IdOperacion,
            cargaSueltaEstado: "Descargo",
          },
          transaction,
        }),
      ]);

      if (
        buscarTodosLasCargasSueltasPertenecientes.length !==
        buscarTodosLasCargasSueltasPertenecientesDescargados.length
      ) {
        return { status: false, error: false };
      }

      const operacion = await OperacionAduanera.update(
        {
          operacionAduaneraEstatus: "Descargo",
        },
        {
          where: {
            IdOperacionAduanera: this.#IdOperacion,
          },
          transaction,
        }
      );

      await transaction.commit();
      return { status: true, error: false };
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      return { status: false, error: true };
    }
  }

  toString() {
    return `Pedimento: ${this.pedimento}, cliente: ${this.cliente}, aduana: ${this.aduana}, patente: ${this.patente}, tipo_Mercancia: ${this.tipo_Mercancia}, tipo_operacion: ${this.tipo_operacion}, estatus: ${this.estatus}`;
  }

  set pedimento(pedimento) {
    this.#pedimento = pedimento;
  }

  get pedimento() {
    return this.#pedimento;
  }

  set cliente(cliente) {
    this.#cliente = cliente;
  }

  get cliente() {
    return this.#cliente;
  }

  set aduana(aduana) {
    this.#aduana = aduana;
  }

  get aduana() {
    return this.#aduana;
  }

  set patente(patente) {
    this.#patente = patente;
  }

  get patente() {
    return this.#patente;
  }

  set tipo_Mercancia(tipo_Mercancia) {
    this.#tipo_Mercancia = tipo_Mercancia;
  }

  get tipo_Mercancia() {
    return this.#tipo_Mercancia;
  }

  set tipo_operacion(tipo_operacion) {
    this.#tipo_operacion = tipo_operacion;
  }

  get tipo_operacion() {
    return this.#tipo_operacion;
  }

  set estatus(estatus) {
    this.#estatus = estatus;
  }

  get estatus() {
    return this.#estatus;
  }

  set IdOperacion(IdOperacion) {
    this.#IdOperacion = IdOperacion;
  }

  get IdOperacion() {
    return this.#IdOperacion;
  }
}

export default Operacion;
