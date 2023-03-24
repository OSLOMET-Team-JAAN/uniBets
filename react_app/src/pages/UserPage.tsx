import React, {useEffect, useState} from "react";
import MyTable from "../components/table/MyTable";
import useCSV from "../hooks/useCSV";
import {
    ClearContext,
    getAll,
    getStoredData,
    getStoredHeaders,
    setDataToStore,
    setHeadersToStore
} from "../services/data.service";
import {AxiosResponse} from "axios";
import {ICSVdata} from "../models/ICSVdata";
import {getHeaders} from "../utils/assistFunctions";
import Loader from "../components/UI/loader/Loader";
const UserPage = () => {
    const [data, setData] = useState([]);
    const [headers, setHeaders] = useState([]);
    //This state will control errors
    const [myError, setMyError] = useState("");
    //State 10_ to show fetching data process
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        handleGetData().then()
    },[])
    
    const handleGetData = async () => {
        try {
            ClearContext();
            setIsLoading(true)
            setMyError('')
            await getAll().then(
                (response: AxiosResponse<Array<ICSVdata>>) => {
                    setDataToStore('csv',response?.data)
                    setData(getStoredData('csv'))
                    const headers = getHeaders(response?.data).filter((item) => item !== 'Id')
                    setHeadersToStore('headers', headers)
                    setHeaders(getStoredHeaders('headers'))                    
                }
            );
            setIsLoading(false)
        } catch (err: any) {
            if (!err.response) {
                setMyError(err.response);
            } else if (err.response?.status === 401) {
                setMyError('Unauthorized');
            } else {
                setMyError('Data Fetching is Failed');
            }
        }
    }
    
    return (
        <>
            <h3>WELCOME TO USER PAGE</h3>
            {myError && <h1 style={{color: "red"}}>{myError}</h1>}
            {isLoading && !myError
                ? <Loader><h2 style={{color: "red"}}>o</h2></Loader>
                : <>
                    {data
                        ? <MyTable
                            columns={headers}
                            rows={data}
                        /> 
                        : <h1 style={{textAlign: "center", color: "teal"}}
                        >No data!
                        </h1>
                    }
                </>
            }
        </>
    );
};

export default UserPage;