import { INDEMNIZACIONES } from "./endpoints";
import Axios from "axios";

export const getAll = async () => {
    const response = await Axios.get(INDEMNIZACIONES.GET_INDEMNIZACIONES);
    return response.data;
}

export const getOne = async (id) => {
    const response = await Axios.get(INDEMNIZACIONES.GET_INDEMNIZACIONES + '/' + id);
    return response.data;
}

export const create = async (data) => {
    const response = await Axios.post(INDEMNIZACIONES.CREATE_INDEMNIZACION, data);
    return response.data;
}

export default {
    getAll,
    getOne,
    create
}
