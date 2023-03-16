import {useContext} from "react";
import CSVHeadersContext from "../context/CSVHeadersProvider";

const useCSVHeaders = () => {
    return useContext(CSVHeadersContext);
}

export default useCSVHeaders;