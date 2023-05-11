import { createBrowserRouter} from 'react-router-dom';
import Layout from '../layout';
import Inicio from '../views/inicio';
import ListEmpleados from '../views/empleados/list';
import DetalleEmpleado, {loader as empleadoLoader} from '../views/empleados/detalle';
import NuevoEmpleado from '../views/empleados/detalle/crear-empleado';
import IncapaList from '../views/incapacidades/list';

import ErrorPage from '../views/error';


export default createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Inicio />,
            },
            {
                path: '/inicio',
                element: <Inicio />,
            },
            {
                path: '/empleados',
                element: <ListEmpleados />,
            },
            {
                path: '/empleados/:accion/:id',
                element: <DetalleEmpleado />,
                loader: empleadoLoader,
            },
            {
                path: '/empleados/crear',
                element: <NuevoEmpleado />,
            },
            {
                path: '/incapacidades',
                element: <IncapaList />
            },
            {
                path: '*',
                element: <ErrorPage />,
            }
        ]
    }
]);