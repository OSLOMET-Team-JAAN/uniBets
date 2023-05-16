﻿import React, {FC} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getCurrentUser} from "./auth.service";
import useAuth from "../hooks/useAuth";

interface Roles {
    allowedRoles: Array<string>
}

const AuthIsRequire: FC<Roles> = ({allowedRoles}) => {
    const location = useLocation();
    const user = getCurrentUser();

    return (
        allowedRoles.includes(user?.role)
            ? <Outlet/>
            : user?.role
                ? <Navigate 
                    to="/unauthorized" 
                    state={{from: location}} 
                    replace/>
                : <Navigate 
                    to="/unauthorized" 
                    state={{from: location}} 
                    replace/>
    );
};

export default AuthIsRequire;

// https://reactrouter.com/en/main/components/navigate
//https://reactrouter.com/en/main/hooks/use-navigate