import Joi from "joi";

const OperacionJOI = Joi.object({
  IdAduana: Joi.string().guid().required(),
  IdCliente: Joi.string().guid().required(),
  IdTipoOperacion: Joi.string().guid().required(),
  IdtipoMercancia: Joi.string().guid().required(),
  operacionAduaneraPedimento: Joi.string().min(3).max(200).required(),
  operacionAduaneraPatente: Joi.string().min(3).max(200).required(),
  pais: Joi.string().length(2).required(),
  fecha: Joi.date().required(),
});

export default OperacionJOI;
