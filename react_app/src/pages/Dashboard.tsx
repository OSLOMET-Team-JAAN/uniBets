import React, {useMemo, useState} from 'react';
import GetTopWinners from "../components/dashboard_components/GetTopWinners";
import GetTopWinner from "../components/dashboard_components/GetTopWinner";
import GetOddsOutliers from "../components/dashboard_components/GetOddsOutliers";
import useCSV from "../hooks/useCSV";
import {getBetWon, getTop, sortRows} from "../utils/assistFunctions";
import GetTopWinnerBetStatus from "../components/dashboard_components/GetTopWinnerBetStatus";
import GetTopWinnerWinRate from "../components/dashboard_components/GetTopWinnerWinRate";
import GetCustomPlayerData from "../components/dashboard_components/GetCustomPlayerData";
import MyInput from "../components/UI/input/MyInput";
import GetDatesRages from "../components/dashboard_components/GetDatesRages";
import {ErrorBoundary} from "../errors/ErrorBoundary";
import ErrorBoundaryResponse from "../errors/ErrorBoundaryResponse";


const Dashboard = () => {
    const {data}: any = useCSV()
    const [playerNo, setPlayerNo] = useState(0);
    const [myTop, setMyTop] = useState(10);
    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])
    
    
    useMemo(() => {
        getTop(sortedData, 1).map((key: any) => {
            setPlayerNo(key["Player_no"]);
        })
    }, [])
    
    
    return (
        <>
            <ErrorBoundary FallbackComponent={ErrorBoundaryResponse} >
                <h3>HERE IS ADMIN DASHBOARD</h3>
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
                <GetTopWinner/>
                <div style={{display: "block", margin: 20,}}>
                    <GetTopWinners
                        sortedData={sortedData}
                        myTop={myTop}
                    />
                </div>
                <div style={{display: "flex", margin: 20}}>

                    {playerNo ?
                        <GetTopWinnerBetStatus topWinner={playerNo} /> : <h3>NO PLAYER DATA</h3>
                    }

                    {playerNo ?
                        <GetTopWinnerWinRate topWinner={playerNo} />
                        :
                        <h3>NO PLAYER DATA</h3>
                    }
                </div>
                <div style={{display: "block", margin: 20}}>
                    <GetOddsOutliers/>
                </div>
                <div>
                    {playerNo ?
                        <GetCustomPlayerData topWinner={playerNo}
                        /> :
                        <h3>NO PLAYER DATA</h3>
                    }
                    <GetDatesRages />
                </div>
            </ErrorBoundary>
        </>
    );
};

export default Dashboard;