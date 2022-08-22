import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';

const NotAuth = () => {
    const [cookies] = useCookies(['user']);
    return (
        cookies?.user?.token
            ? <Navigate to={-1} replace />
            : <Outlet />
    );
}

export default NotAuth