import axios from "axios";
import { config } from "dotenv";
config();
const clienteAxios = axios.create({
  baseURL: `${process.env.AWS_API_GATEWAY}`,
});

export default clienteAxios;
