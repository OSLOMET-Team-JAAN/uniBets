import {createContext, useState} from "react";

const CSVHeadersContext = createContext({});

interface Props {
    children?: any
}

export const CSVHeadersProvider = ({children}: Props) => {
    const [csvHeaders, setCsvHeaders] = useState<Array<string>>([]);
    return (
        <CSVHeadersContext.Provider
            value={{csvHeaders, setCsvHeaders}}>
            {children}
        </CSVHeadersContext.Provider>
    )
}

export default CSVHeadersContext;