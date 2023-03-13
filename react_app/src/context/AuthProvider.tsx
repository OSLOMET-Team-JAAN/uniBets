import {createContext, useState} from "react";

const AuthContext = createContext({});

interface Props {
    children?: any
}
export const AuthProvider = ({children}:Props) => {
    const [auth, setAuth] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;