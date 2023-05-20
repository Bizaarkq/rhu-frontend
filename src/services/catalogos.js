import { CATALOGOS } from "./endpoints";
import Axios from "axios";

export const getPlazas = async () => {
    const response = await Axios.get(CATALOGOS.GET_PLAZAS);
    return response.data;
}

export default {
    getPlazas
}
