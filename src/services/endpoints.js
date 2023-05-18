
export const EMPLEADOS = {
    GET_EMPLEADOS: import.meta.env.VITE_URL_BACKEND + '/empleados',
    DETALLE_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/detalle',
    UPDATE_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/update',
    CREATE_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/save',
    DELETE_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/despedir',
    BOLETAS_EMPLEADO: import.meta.env.VITE_URL_BACKEND + '/empleados/boletas',
}

export const CATALOGOS = {
    GET_PLAZAS: import.meta.env.VITE_URL_BACKEND + '/catalogos/plazas',
}

export const INCAPACIDADES = {
    GET_INCAPACIDADES_EVENTOS: import.meta.env.VITE_URL_BACKEND + '/incapacidades/eventos',
    CREATE_INCAPACIDAD: import.meta.env.VITE_URL_BACKEND + '/incapacidades/add',
    UPDATE_INCAPACIDAD: import.meta.env.VITE_URL_BACKEND + '/incapacidades/edit',
    DELETE_INCAPACIDAD: import.meta.env.VITE_URL_BACKEND + '/incapacidades/delete',
}

export const AUSENCIAS = {
    GET_AUSENCIAS_EVENTOS: import.meta.env.VITE_URL_BACKEND + '/ausencias/eventos',
    CREATE_AUSENCIA: import.meta.env.VITE_URL_BACKEND + '/ausencias/add',
    UPDATE_AUSENCIA: import.meta.env.VITE_URL_BACKEND + '/ausencias/edit',
    DELETE_AUSENCIA: import.meta.env.VITE_URL_BACKEND + '/ausencias/delete',
}

export const INDEMNIZACIONES = {
    GET_INDEMNIZACIONES: import.meta.env.VITE_URL_BACKEND + '/indemnizaciones',
    CREATE_INDEMNIZACION: import.meta.env.VITE_URL_BACKEND + '/indemnizaciones/store',
    GET_EMPLEADOS_ACTIVOS: import.meta.env.VITE_URL_BACKEND + '/indemnizaciones/empleados-activos',
}

export const BOLETA = {
    GENERAR_BOLETA: import.meta.env.VITE_URL_BACKEND + '/boletas/generar',
}