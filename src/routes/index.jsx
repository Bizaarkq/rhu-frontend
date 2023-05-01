import { createBrowserRouter} from 'react-router-dom';
import Layout from '../layout';
import Inicio from '../views/inicio';
import Menu from '../components/menu';
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
            }
        ]
    }
]);