
export const EMPLEADOS = {
    GET_EMPLEADOS: import.meta.env.VITE_URL_BACKEND + '/empleados',
    UPDATE_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/update',
    CREATE_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/save',
    DELETE_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/despedir',
}

export const CATALOGOS = {
    GET_PLAZAS: import.meta.env.VITE_URL_BACKEND + '/catalogos/plazas',
}

export const INCAPACIDADES = {
    GET_INCAPACIDADES_EVENTOS: import.meta.env.VITE_URL_BACKEND + '/incapacidades/eventos',
}