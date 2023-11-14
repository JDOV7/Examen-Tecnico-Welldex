import Joi from "joi";

const CargaSueltaJOI = Joi.object({
  cargaSueltaDescripcion: Joi.string().min(3).max(200).required(),
  cargaSueltaCantidad: Joi.number().min(1).required(),
  cargaSueltaFechaDescargo: Joi.date().required(),
});

export default CargaSueltaJOI;
