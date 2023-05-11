import { INCAPACIDADES } from "./endpoints";
import Axios from "axios";

export const getAll = async () => {
    const response = await Axios.get(INCAPACIDADES.GET_INCAPACIDADES_EVENTOS);
    return response.data;
}

export const create = async (data) => {
    const response = await Axios.post(INCAPACIDADES.CREATE_INCAPACIDAD, data);
    return response.data;
}

export const update = async (data) => {
    const response = await Axios.post(INCAPACIDADES.UPDATE_INCAPACIDAD, data);
    return response.data;
}

export const deleteInc = async (data) => {
    const response = await Axios.post(INCAPACIDADES.DELETE_INCAPACIDAD, data);
    return response.data;
}

export default {
    getAll,
    create,
    update,
    deleteInc
}