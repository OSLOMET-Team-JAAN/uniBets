import React, {useEffect, useMemo, useState} from 'react';
import GetTopWinners from "../components/dashboard_components/GetTopWinners";
import GetTopWinner from "../components/dashboard_components/GetTopWinner";
import GetOddsOutliers from "../components/dashboard_components/GetOddsOutliers";
import {getBetWon, getHeaders, getTop, sortRows} from "../utils/assistFunctions";
import GetTopWinnerBetStatus from "../components/dashboard_components/GetTopWinnerBetStatus";
import GetTopWinnerWinRate from "../components/dashboard_components/GetTopWinnerWinRate";
import GetCustomPlayerData from "../components/dashboard_components/GetCustomPlayerData";
import MyInput from "../components/UI/input/MyInput";
import GetDatesRages from "../components/dashboard_components/GetDatesRages";
import {ErrorBoundary} from "../errors/ErrorBoundary";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import useCSV from "../hooks/useCSV";
import st from '../styles/pages/DashboardStyle.module.css';
import GetBetsWinRateTopWinners from "../components/dashboard_components/GetBetsWinRateTopWinners";
import {ClearContext, getAll} from "../services/data.service";
import {AxiosResponse} from "axios";
import {ICSVdata} from "../models/ICSVdata";
import Loader from "../components/UI/loader/Loader";


const Dashboard = () => {
    const {data, setData, setHeaders}: any = useCSV();
    const [playerNo, setPlayerNo] = useState(0);
    const [myTop, setMyTop] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [myError, setMyError] = useState("");
    
    
    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'});
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings]);
    
    useEffect(() => {
        if (localStorage.getItem('csv') === null){
            handleGetData().then()
        }        
    },[])

    useEffect(() => {
        getTop(sortedData, 1).map((key: any) => {
            return setPlayerNo(key["Player_no"]);
        })
    }, [sortedData]);

    const handleGetData = async () => {
        try {
            ClearContext();
            setIsLoading(true)
            setMyError('')
            await getAll().then(
                (response: AxiosResponse<Array<ICSVdata>>) => {
                    setData(response?.data)
                    const headers = getHeaders(response?.data).filter((item) => item !== 'Id')
                    setHeaders(headers)
                    alert("Not found data from CSV file! \nData is fetched from database successfully");
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
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
                {isLoading && !myError
                    ? <Loader><h2 style={{color: "red"}}>o</h2></Loader>
                    : <>
                        <h3>Welcome To ADMIN Dashboard</h3>
                        <br/>        
                        <div className={st.cont}>
                            <label htmlFor="Player_no">Player no: </label>
                            <MyInput
                                value={playerNo}
                                name="Player_no"
                                placeholder="Enter Player_no here.."
                                autoComplete="off"
                                onChange={(e) => setPlayerNo(e.target.value)}
                            />
                            <label htmlFor="Top_element">TOP customization: </label>
                            <MyInput
                                value={myTop}
                                name="Top_element"
                                placeholder="Enter Your TOP here.."
                                autoComplete="off"
                                onChange={(e) => setMyTop(e.target.value)}
                            />
                        </div>
                        <br/>
                        <GetTopWinner/>
                        <div>
                            <GetTopWinners
                                sortedData={sortedData}
                                myTop={myTop}
                            />
                        </div>
                        <div>
                            <br/>
                        </div>
                        <div className={st.bets}>
        
                            {playerNo ?
                                <GetTopWinnerBetStatus Player={playerNo}/> : <h3>NO PLAYER DATA</h3>
                            }
        
                            {playerNo ?
                                <GetTopWinnerWinRate Player={playerNo}/>
                                :
                                <h3>NO PLAYER DATA</h3>
                            }
                        </div>
                        <div>
                            {playerNo ?
                                <GetDatesRages Player={playerNo}/>
                                :
                                <h3>NO PLAYER DATA</h3>
                            }
                        </div>
                        <div>
                            <GetBetsWinRateTopWinners
                                myTop={myTop}
                            />
                        </div>
                        <div style={{display: "block", margin: 20}}>
                            <GetOddsOutliers/>
                        </div>
                        <div>
                            {playerNo ?
                                <GetCustomPlayerData Player={playerNo}
                                /> :
                                <h3>NO PLAYER DATA</h3>
                            }
                        </div>
                    </>}
            </ErrorBoundary>
        </>
    );
};

export default Dashboard;

//https://github.com/gitdagray/react_protected_routes/blob/main/src/components/Login.js
//https://ru.reactjs.org/docs/hooks-reference.html#useref
