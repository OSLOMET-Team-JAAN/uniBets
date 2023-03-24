import {createContext, useEffect, useMemo, useState} from "react";

import {getStoredData, getStoredHeaders, setDataToStore, setHeadersToStore} from "../services/data.service";

const DataContext = createContext({});

interface Props {
    children?: any
}

export const DataProvider = ({children}: Props) => {

    const [data, setData] = useState(getStoredData('csv') || []);
    const [headers, setHeaders] = useState(getStoredHeaders('headers') || []);
    const value = useMemo(() => ({data, headers, setData, setHeaders}),[data, headers])
    
        
    return (
        <DataContext.Provider
            value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;