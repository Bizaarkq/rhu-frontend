
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