import Joi from "joi";

const ContenedorJOI = Joi.object({
  contenedorTipo: Joi.string().min(3).max(10).required(),
  contenedorAncho: Joi.number().min(1).required(),
  contenedorAlto: Joi.number().min(1).required(),
  contenedorFechaDescargo: Joi.date().required(),
});

export default ContenedorJOI;
