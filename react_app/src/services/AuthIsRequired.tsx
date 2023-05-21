import React, {FC} from 'react';
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {getCurrentUser} from "./auth.service";

interface IRoles {
    allowedRoles: Array<string>
}

const AuthIsRequired: FC<IRoles> = ({allowedRoles}) => {
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
                    to="/login" 
                    state={{from: location}} 
                    replace/>
    );
};

export default AuthIsRequired;

// https://reactrouter.com/en/main/components/navigate
//https://reactrouter.com/en/main/hooks/use-navigate