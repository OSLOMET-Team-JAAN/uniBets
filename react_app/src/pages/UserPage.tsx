import React, {FC, useEffect, useState} from "react";
import MyTable from "../components/table/MyTable";
import {getAll,} from "../services/data.service";
import {AxiosResponse} from "axios";
import {ICSVdata} from "../models/ICSVdata";
import {getHeaders} from "../utils/assistFunctions";
import Loader from "../components/UI/loader/Loader";
import st from '../styles/pages/UserPageStyle.module.css';
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import {ErrorBoundary} from "../errors/ErrorBoundary";

const UserPage: FC = () => {
    //Data storing
    const [data, setData] = useState<Array<ICSVdata>>([]);
    //Headers for table
    const [headers, setHeaders] = useState<Array<string>>([]);
    //This state holds errors
    const [myError, setMyError] = useState("");
    //Show / hide loader
    const [isLoading, setIsLoading] = useState(false);

    //Fetching data after mounting
    useEffect(() => {
        handleGetData()
            .catch((error) => {
            setMyError(`An error occurred while fetching data. ${error}`);
        })
    }, [])

    //Data fetching from DB
    const handleGetData = async () => {
        try {
            setIsLoading(true)
            setMyError('')
            await getAll().then(
                (response: AxiosResponse<Array<ICSVdata>>) => {
                    const headers = getHeaders(response?.data).filter((item) => item !== 'Id')
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
        <div data-testid="userPage">
            <ErrorBoundary ResponseComponent={ErrorBoundaryResponse}>
                <h2>WELCOME TO USER PAGE</h2>
                <br/>
                <div className={st.cont}>
                    <br/>
                    {myError && <h5 style={{color: "red"}}>{myError}</h5>}
                    {isLoading && !myError
                        ? <Loader />
                        : <>
                            {data
                                ? <MyTable
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

export default UserPage;