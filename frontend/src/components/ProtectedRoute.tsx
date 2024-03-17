import { useContext } from "react";
import { Store } from "../Store";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
    const { state: { userInfo } } = useContext(Store)

    if(userInfo) {
        return <Outlet />
    } else {
        return <Navigate to={'/signin'} />
    }
}