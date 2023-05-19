import { EMPLEADOS, BOLETA, NOMINA } from "./endpoints";
import Axios from "axios";

export const getAll = async () => {
    const response = await Axios.get(EMPLEADOS.GET_EMPLEADOS);
    return response.data;
}

export const getOne = async (id) => {
    const response = await Axios.get(EMPLEADOS.DETALLE_EMPLEADO + '/' + id);
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

export const boletas = async () => {
    const response = await Axios.get(EMPLEADOS.BOLETAS_EMPLEADO);
    return response.data;
}

export const generarBoletas = async (data) => {
    const response = await Axios.post(BOLETA.GENERAR_BOLETA, data);
    return response.data;
}

export const getBoleta = async (id_empleado, id_boleta) => {
    const response = await Axios.get(EMPLEADOS.BOLETAS_EMPLEADO + '/' + id_empleado + '/' + id_boleta);
    return response.data;
}

export const getPlanilla = async (mes, anio, quincena) => {
    const response = await Axios.get(NOMINA.GET_NOMINA + '/' + anio + '/' + mes + '/' + quincena);
    return response.data;
}

export default {
    getAll,
    getOne,
    update,
    create,
    boletas,
    generarBoletas,
    getBoleta,
    getPlanilla
}
