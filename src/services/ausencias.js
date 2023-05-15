import { AUSENCIAS } from "./endpoints";
import Axios from "axios";

export const getAll = async () => {
    const response = await Axios.get(AUSENCIAS.GET_AUSENCIAS_EVENTOS);
    return response.data;
}

export const create = async (data) => {
    const response = await Axios.post(AUSENCIAS.CREATE_AUSENCIA, data);
    return response.data;
}

export const update = async (data) => {
    const response = await Axios.post(AUSENCIAS.UPDATE_AUSENCIA, data);
    return response.data;
}

export const deleteA = async (data) => {
    const response = await Axios.post(AUSENCIAS.DELETE_AUSENCIA, data);
    return response.data;
}

export default {
    getAll,
    create,
    update,
    deleteA
}