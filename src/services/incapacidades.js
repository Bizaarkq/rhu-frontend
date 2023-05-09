import { INCAPACIDADES } from "./endpoints";
import Axios from "axios";

export const getAll = async () => {
    const response = await Axios.get(INCAPACIDADES.GET_INCAPACIDADES_EVENTOS);
    return response.data;
}

export default {
    getAll
}