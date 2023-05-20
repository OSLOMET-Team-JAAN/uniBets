import {useContext} from "react";
import AuthContext from "../context/AuthProvider";

//The following hook's usage was suspended
//Auth logic was changed
const useAuth = () => {
    return useContext(AuthContext);
}

export default useAuth;