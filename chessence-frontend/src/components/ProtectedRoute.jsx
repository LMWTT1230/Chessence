import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn }) => {
    console.log("isLoggedIn: ", isLoggedIn);
    return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default ProtectedRoute;
