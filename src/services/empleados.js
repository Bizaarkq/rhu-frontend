import { EMPLEADOS } from "./endpoints";
import Axios from "axios";

export const getAll = async () => {
    const response = await Axios.get(EMPLEADOS.GET_EMPLEADOS);
    return response.data;
}

export const getOne = async (id) => {
    const response = await Axios.get(EMPLEADOS.GET_EMPLEADOS + '/' + id);
    return response.data;
}

export const update = async (id, data) => {
    const response = await Axios.post(EMPLEADOS.UPDATE_EMPLEADO + '/' + id, data);
    return response.data;
}

export const create = async (data) => {
    const response = await Axios.post(EMPLEADOS.CREATE_EMPLEADO, data);
    return response.data;
}

export default {
    getAll,
    getOne,
    update
}
