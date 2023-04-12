import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    let verified;
    console.log(verified);
    return verified ? <Outlet /> : <Navigate replace to ="/"></Navigate> ;
};

export default ProtectedRoutes