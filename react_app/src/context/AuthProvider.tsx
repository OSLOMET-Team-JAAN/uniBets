import {createContext, FC, ReactNode, useState} from "react";

const AuthContext = createContext({});

interface Props {
    children?: ReactNode;
}

export const AuthProvider: FC<Props> = ({children}) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;