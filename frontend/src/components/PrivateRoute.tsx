
import { Navigate } from "react-router-dom";
import type { JSX } from "react";
import { useSelector } from 'react-redux'
import type { RootState } from '../store'




const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

    return isAuthenticated? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;