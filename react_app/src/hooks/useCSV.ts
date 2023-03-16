import {useContext} from "react";
import CSVContext from "../context/CSVdataProvider";

const useCSV = () => {
    return useContext(CSVContext);
}

export default useCSV;