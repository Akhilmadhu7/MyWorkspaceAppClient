import { Navigate } from "react-router";
import {useSelector} from "react-redux";

const PublicRoutes = ({children}) => {

    const isUserAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (isUserAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}

export default PublicRoutes;
