import { useRoutes } from 'react-router-dom';
import path from './constants/path';
import Login from './pages/Login';
import Home from './pages/Home';

const useRouterElements = () => {
    const routeElements = useRoutes([
        {
            path: path.login,
            index: true,
            element: <Login />,
        },
        {
            path: path.home,
            index: true,
            element: <Home />,
        },
    ]);
    return routeElements;
};

export default useRouterElements;
