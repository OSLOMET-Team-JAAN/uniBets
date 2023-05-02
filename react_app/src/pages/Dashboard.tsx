import React, {FC, useEffect, useMemo, useState} from 'react';
import GetTopWinners from "../components/dashboard_components/GetTopWinners";
import GetTopWinner from "../components/dashboard_components/GetTopWinner";
import GetOddsOutliers from "../components/dashboard_components/GetOddsOutliers";
import {getBetWon, getHeaders, getTop, sortRows} from "../utils/assistFunctions";
import GetTopWinnerBetStatus from "../components/dashboard_components/GetTopWinnerBetStatus";
import GetTopWinnerWinRate from "../components/dashboard_components/GetTopWinnerWinRate";
import GetCustomPlayerData from "../components/dashboard_components/GetCustomPlayerData";
import MyInput from "../components/UI/input/MyInput";
import GetDatesIntervals from "../components/dashboard_components/GetDatesIntervals";
import {ErrorBoundary} from "../errors/ErrorBoundary";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";
import useCSV from "../hooks/useCSV";
import st from '../styles/pages/DashboardStyle.module.css';
import GetBetsWinRateTopWinners from "../components/dashboard_components/GetBetsWinRateTopWinners";
import {ClearContext, getAll} from "../services/data.service";
import Loader from "../components/UI/loader/Loader";
import {AxiosResponse} from "axios";
import {ICSVdata} from "../models/ICSVdata";
import InfoModal from "../components/UI/modals/InfoModal";
import MyButton from "../components/UI/buttons/MyButton";


const Dashboard: FC = () => {
    //using data from context
    const {data, setData, setHeaders}: any = useCSV();
    //This state is to store player_no, we have player_no fetched from
    //database as number and from localStorage as string - we need state for both <number | string>
    const [playerNo, setPlayerNo] = useState<string>( '');
    const [myTop, setMyTop] = useState<string>('10');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [myError, setMyError] = useState("");    
    
    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'});
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings]);
    
    useEffect(() => {
        if ( Object.keys(data).length === 0){
            handleGetData().then()            
        }        
    },[]);

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
                    setData(response?.data);
                    const headers = getHeaders(response?.data).filter((item) => item !== 'Id');
                    setHeaders(headers);
                    setIsVisible(true);
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
    
    function verifyPlayer(item: any){
        if (localStorage.getItem('csv') === null){
            return setPlayerNo(item.toString());
        }else {
            return setPlayerNo(item.toString())
        }        
    }

    function verifyMyTop(item: any){
        if (localStorage.getItem('csv') === null){
            return setMyTop((item));
        }else {
            return setMyTop(item)
        }
    }

    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse}>
                {isLoading && !myError
                    ? <Loader><h2 style={{color: "red"}}>o</h2></Loader>
                    : <> {isVisible ?
                                <InfoModal
                                    visible={isVisible}
                                    setVisible={setIsVisible}
                                >
                                    <div style={{color: "red"}}>
                                        <p>Not found data from CSV file! Data is fetched from database successfully</p>
                                    </div>
                                    <MyButton onClick={() => {
                                        setIsVisible(false)
                                    }}>Close</MyButton>
                                </InfoModal> 
                        :
                        <>
                            <h3>Welcome To ADMIN Dashboard</h3>
                            <br/>
                            <div className={st.cont}>
                                <label 
                                    htmlFor="Player_no"
                                >Player no: </label>
                                <MyInput
                                    value={playerNo}
                                    name="Player_no"
                                    placeholder="Enter Player_no here.."
                                    autoComplete="off"
                                    onChange={(e) => verifyPlayer(e.target.value)}
                                />
                                <label 
                                    htmlFor="Top_element"
                                >TOP customization: 
                                </label>
                                <MyInput
                                    value={myTop}
                                    name="Top_element"
                                    placeholder="Enter Your TOP here.."
                                    autoComplete="off"
                                    onChange={(e) => verifyMyTop(e.target.value)}
                                />
                            </div>
                            <div 
                                className={st.cont}>
                                <GetTopWinner/>
                            </div>
                            <div>
                                {myTop ?
                                    <GetTopWinners
                                    sortedData={sortedData}
                                    myTop={parseInt(myTop)}
                                />
                                : <h4 
                                        className={st.errCont}
                                    >NO DATA FOUND! PLEASE CUSTOMIZE YOUR TOP</h4>
                                }
                            </div>
                            <div 
                                className={st.bets}>
                                {playerNo ?
                                    <GetTopWinnerBetStatus 
                                        Player={parseInt(playerNo)}/>
                                    : <h4 
                                        className={st.errCont}
                                    >NO DATA FOUND! PLEASE ENTER PLAYER NUMBER</h4>
                                }

                                {playerNo ?
                                    <GetTopWinnerWinRate 
                                        Player={parseInt(playerNo)}/>
                                    :
                                    <h4 
                                        className={st.errCont}
                                    >NO DATA FOUND! PLEASE ENTER PLAYER NUMBER</h4>
                                }

                                {playerNo ?
                                    <GetDatesIntervals
                                        Player={parseInt(playerNo)}/>
                                    :
                                    <h4 
                                        className={st.errCont}
                                    >NO DATA FOUND! PLEASE ENTER PLAYER NUMBER</h4>
                                }
                            </div>
                            <div>
                                {myTop 
                                    ?
                                    <GetBetsWinRateTopWinners
                                        myTop={parseInt(myTop)}
                                    /> 
                                    : <h4 
                                        className={st.errCont}
                                    >NO DATA FOUND! PLEASE CUSTOMIZE YOUR TOP</h4>}
                            </div>
                            <div>
                                <GetOddsOutliers/>
                            </div>
                            <div>
                                {playerNo ?
                                    <GetCustomPlayerData 
                                        Player={parseInt(playerNo)}
                                    /> :
                                    <h4 
                                        className={st.errCont}
                                    >NO DATA FOUND! PLEASE ENTER PLAYER NUMBER</h4>
                                }
                            </div>
                        </>
                    }                        
                        </>
                    
                }
            </ErrorBoundary>
        </>
    );
};

export default Dashboard;

//https://github.com/gitdagray/react_protected_routes/blob/main/src/components/Login.js
//https://ru.reactjs.org/docs/hooks-reference.html#useref
