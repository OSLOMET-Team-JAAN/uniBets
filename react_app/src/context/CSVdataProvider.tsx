import {createContext, useState} from "react";
import {ICSVdata} from "../models/ICSVdata";

const CSVContext = createContext({});

interface Props {
    children?: any
}
export const DataProvider = ({children}:Props) => {
    const [data, setData] = useState<Array<ICSVdata>>([]);
    return (
        <CSVContext.Provider
            value={{data, setData}}>
            {children}
        </CSVContext.Provider>
    )
}

export default CSVContext;