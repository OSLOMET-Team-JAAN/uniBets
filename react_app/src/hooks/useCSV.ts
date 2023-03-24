import {useContext} from "react";
import CSVContext from "../context/DataProvider";

const useCSV = () => {
    return useContext(CSVContext);
}

export default useCSV;