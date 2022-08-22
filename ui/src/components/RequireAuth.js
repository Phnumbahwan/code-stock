import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';

const RequireAuth = () => {
    // const { auth } = useAuth();
    const location = useLocation();
    const [cookies] = useCookies(['user']);
    return (
        cookies?.user?.token
            ? <Outlet/>
            : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;