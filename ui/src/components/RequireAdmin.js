import { Navigate, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie';

function RequireAdmin() {
    const [cookies] = useCookies(['user']);
    
    return (
        cookies?.user?.user.role == '1'
            ? <Outlet />
            : <Navigate to="/" replace />
    )
}

export default RequireAdmin