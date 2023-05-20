
export const MENU = [
    {
        id: 0,
        name: 'Inicio',
        icon: 'home',
        path: '/'
    },
    {
        id: 1,
        name: 'Empleados',
        icon: 'person',
        path: '/empleados'
    },
    {   
        id: 2,
        name: 'Planilla',
        icon: 'summarize',
        path: '/planilla'
    },
    {
        id: 3,
        name: 'Incapacidades',
        icon: 'health_and_safety',
        path: '/incapacidades'
    },
    {
        id: 4,
        name: 'Ausencias',
        icon: 'receipt_long',
        path: '/ausencias'
    },
    {
        id: 5,
        name: 'Indemnizaciones',
        icon: 'receipt_long',
        path: '/indemnizaciones'
    },
    {
        id: 6,
        name: 'Boletas de pago',
        icon: 'receipt_long',
        path: '/boletas'
    }
]

export const MENU_PANEL = [
    {
        id: 1,
        name: 'Empleados',
        icon: 'person',
        path: '/empleados'
    },
    {   
        id: 2,
        name: 'Planilla',
        icon: 'summarize',
        path: '/planilla'
    },
    {
        id: 3,
        name: 'Incapacidades',
        icon: 'health_and_safety',
        path: '/incapacidades'
    },
    {
        id: 4,
        name: 'Ausencias',
        icon: 'receipt_long',
        path: '/ausencias'
    },
    {
        id: 5,
        name: 'Indemnizaciones',
        icon: 'receipt_long',
        path: '/indemnizaciones'
    },
    {
        id: 6,
        name: 'Boletas de pago',
        icon: 'receipt_long',
        path: '/boletas'
    }
]

export const MESSAGE_CALENDAR = Object.freeze({
    week: 'Semana',
    work_week: 'Semana de trabajo',
    day: 'Día',
    month: 'Mes',
    previous: 'Atrás',
    next: 'Después',
    today: 'Hoy',
    agenda: 'El Diario',

    showMore: (total) => `+${total} más`,
});

export const MESES = Object.freeze({
    1: 'Enero',
    2: 'Febrero',
    3: 'Marzo',
    4: 'Abril',
    5: 'Mayo',
    6: 'Junio',
    7: 'Julio',
    8: 'Agosto',
    9: 'Setiembre',
    10: 'Octubre',
    11: 'Noviembre',
    12: 'Diciembre'
});

export const QUINCENA = Object.freeze({
    1: 'Primera',
    2: 'Segunda'
});
