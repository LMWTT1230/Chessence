import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedGame = ({isInGame}) => {
    console.log("isInGame: ", isInGame);
    return <div>
        {isInGame ? <Outlet />: <Navigate to='/start' />}
    </div>;
};

export default ProtectedGame;