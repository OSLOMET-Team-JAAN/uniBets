import {createContext, FC, ReactNode, useMemo, useState} from "react";

import {getStoredData, getStoredHeaders} from "../services/data.service";

const DataContext = createContext({});

interface Props {
    children?: ReactNode
}




export const DataProvider: FC<Props> = ({ children }) => {


    const [data, setData] = useState(getStoredData('csv') || []);
    const [headers, setHeaders] = useState(getStoredHeaders('headers') || []);
    const [dataSource, setDataSource] = useState('');
    const value = useMemo(() => (
        {
            data,
            setData,
            headers,
            setHeaders,
            dataSource, 
            setDataSource,
        }
    ), [data, headers, dataSource])


    return (
        <DataContext.Provider
            value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;