import {createContext, useEffect, useMemo, useReducer, useState} from "react";
import {ICSVdata} from "../models/ICSVdata";
import {getStoredData, getStoredHeaders} from "../services/data.service";

const DataContext = createContext({});

interface Props {
    children?: any
}

export const DataProvider = ({children}: Props) => {
    
    const [data, setData] = useState<Array<ICSVdata>>([]);
    const [headers, setHeaders] = useState<Array<string>>([]);
    useEffect(() => {
        setData(getStoredData('csv'));
        setHeaders(getStoredHeaders('headers'))
    },[])
    const value = useMemo(() => ({data, headers, setData, setHeaders}),[data, headers])
    
        
    return (
        <DataContext.Provider
            value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;