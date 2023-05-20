import { createBrowserRouter} from 'react-router-dom';
import Layout from '../layout';
import Inicio from '../views/inicio';
import ListEmpleados, { loader as empListLoader} from '../views/empleados/list';
import ListIndemnizaciones from '../views/indemnizaciones/list';
import DetalleEmpleado, {loader as empleadoLoader} from '../views/empleados/detalle';
import DetalleIndemnizacion, {loader as indemnizacionLoader} from '../views/indemnizaciones/detalle';
import NuevoEmpleado from '../views/empleados/detalle/crear-empleado';
import NuevaIndemnizacion from '../views/indemnizaciones/detalle/crear-indemnizacion';
import IncapaList from '../views/incapacidades/list';
import Ausencias from '../views/ausencias';
import Boletas, { loader as boletaLoader} from '../views/boletas';
import DetalleBoleta, { loader as detalleBoletaLoader} from '../views/boletas/detalle';
import Planillas from '../views/planilla';

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
                loader: empListLoader,
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
                path: '/indemnizaciones',
                element: <ListIndemnizaciones />,
            },
            {
                path: '/indemnizaciones/:accion/:id',
                element: <DetalleIndemnizacion />,
                loader: indemnizacionLoader,
            },
            {
                path: '/indeminizacion/crear',
                element: <NuevaIndemnizacion />,
            },
            {
                path: '/ausencias',
                element: <Ausencias />
            },
            {
                path: '/boletas',
                element: <Boletas />,
                loader: boletaLoader,
            },
            {
                path: '/boletas/ver/:id_empleado/:id_boleta',
                element: <DetalleBoleta />,
                loader: detalleBoletaLoader,
            },
            {
                path: '/planilla',
                element: <Planillas />
            },
            {
                path: '*',
                element: <ErrorPage />,
            }
        ]
    }
]);