import React, {useEffect, useState} from 'react';
import {getInbox} from "../services/data.service";
import {AxiosResponse} from "axios";
import {getHeaders} from "../utils/assistFunctions";
import IContact from "../models/IContact";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import st from "../styles/pages/Inbox.module.css";
import Loader from "../components/UI/loader/Loader";
import DataTable from "../components/table/DataTable";
import {ErrorBoundary} from "../errors/ErrorBoundary";

const Inbox = () => {
    const [data, setData] = useState<Array<IContact>>([]);
    const [headers, setHeaders] = useState<Array<string>>([]);
    // const keys = Object.keys(_mockData[0]);
    //This state will control errors
    const [myError, setMyError] = useState("");
    //State 10_ to show fetching data process
    const [isLoading, setIsLoading] = useState(false);
    
    useEffect(() => {
        handleGetData().then()
    }, [])

    const handleGetData = async () => {
        try {
            setIsLoading(true)
            setMyError('')
            await getInbox().then(
                (response: AxiosResponse<Array<IContact>>) => {
                    const headers = getHeaders(response?.data)
                    setData(response?.data)
                    setHeaders(headers)
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
        <div data-testid="inboxPage">
            <ErrorBoundary ResponseComponent={ErrorBoundaryResponse}>
                <h2>Welcome to Inbox Page</h2>
                <br/>
                <div className={st.cont}>
                    <br/>
                    {myError && <h5 style={{color: "red"}}>{myError}</h5>}
                    {isLoading && !myError
                        ? <Loader><h4 style={{color: "red"}}>o</h4></Loader>
                        : <>
                            {data
                                ? <DataTable
                                    columns={headers}
                                    rows={data}
                                />
                                : <p style={{textAlign: "center", color: "teal"}}
                                >No data!
                                </p>
                            }
                        </>
                    }
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default Inbox;