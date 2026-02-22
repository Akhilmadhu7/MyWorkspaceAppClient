import { Navigate, Outlet, useLocation } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoutes = ({children}) => {

    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();

    return (
        isUserAuthenticated ? <Outlet/> : <Navigate to="/signin" state={{from: location}} replace />
    );
};

export default ProtectedRoutes;