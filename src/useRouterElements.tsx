import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import path from './constants/path';
import { Role } from './types/role';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import UserHomePage from './pages/UserPages/UserHomePage';
import Login from './pages/AuthPages/Login';
import ForgotPasswordPage from './pages/AuthPages/ForgotPasswordPage';
import NotFound from './pages/NotFound';
import AdminHomePage from './pages/AdminPages/AdminHomePage/AdminHomePage';
import ChangePasswordPage from './pages/AuthPages/ChangePasswordPage';
import UserLayout from './layouts/UserLayout';
import ProfileUserPage from './pages/UserPages/ProfileUserPage';
import TimekeepingPage from './pages/UserPages/TimekeepingPage';

function ProtectRoute() {
    const roleAuth = useSelector((state: RootState) => state.RoleAuth.roleAuth);
    return roleAuth ? <Outlet /> : <Navigate to={path.login} />;
}

function UserRoute() {
    const roleAuth = useSelector((state: RootState) => state.RoleAuth.roleAuth);
    return roleAuth === Role.USER ? <Outlet /> : <Navigate to={path.login} />;
}
function AdminRoute() {
    const roleAuth = useSelector((state: RootState) => state.RoleAuth.roleAuth);
    return roleAuth === Role.ADMIN ? <Outlet /> : <Navigate to={path.notFoundPage} />;
}

function RejectedRoute() {
    const roleAuth = useSelector((state: RootState) => state.RoleAuth.roleAuth);
    return !roleAuth ? (
        <Outlet />
    ) : (
        <Navigate to={`${roleAuth === 'admin' ? path.AdminHomePage : path.UserHomePage}`} />
    );
}

const useRouterElements = () => {
    const routeElements = useRoutes([
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: '/',
                    element: <Navigate to={path.login} />,
                },
            ],
        },
        {
            path: '',
            element: <RejectedRoute />,
            children: [
                {
                    path: path.login,
                    element: <Login />,
                },
                {
                    path: path.forgotPassword,
                    element: <ForgotPasswordPage />,
                },
                {
                    path: path.changePassword,
                    element: <ChangePasswordPage />,
                },
            ],
        },
        {
            path: '',
            element: <ProtectRoute />,
            children: [
                {
                    path: '',
                    element: <UserLayout />,
                    children: [
                        {
                            path: path.profileUserPage,
                            element: <ProfileUserPage />,
                        },
                    ],
                },
            ],
        },
        {
            path: '',
            element: <ProtectRoute />,
            children: [
                {
                    path: '',
                    element: <UserRoute />,
                    children: [
                        {
                            path: '',
                            element: <UserLayout />,
                            children: [
                                {
                                    path: path.UserHomePage,
                                    element: <UserHomePage />,
                                },
                                {
                                    path: path.timekeeping,
                                    element: <TimekeepingPage />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            path: '',
            element: <ProtectRoute />,
            children: [
                {
                    path: '',
                    element: <UserLayout />,
                    children: [
                        {
                            path: path.AdminHomePage,
                            element: <AdminRoute />,
                            children: [
                                {
                                    path: '',
                                    element: <AdminHomePage />,
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ]);
    return routeElements;
};

export default useRouterElements;
