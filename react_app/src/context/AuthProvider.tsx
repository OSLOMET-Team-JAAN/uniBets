import {createContext, FC, ReactNode, useState} from "react";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../errors/ErrorBoundary";

const AuthContext = createContext({});

interface Props {
    children?: ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <ErrorBoundary
            ResponseComponent={ErrorBoundaryResponse}>
            <AuthContext.Provider value={{auth, setAuth}}>
                {children}
            </AuthContext.Provider>
        </ErrorBoundary>
    )
}

export default AuthContext;

// https://github.com/gitdagray/react_protected_routes/blob/main/src/context/AuthProvider.js