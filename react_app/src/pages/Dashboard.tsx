import React, {useMemo, useState} from 'react';
import GetTop10Winners from "../components/dashboard_components/GetTop10Winners";
import GetTopWinner from "../components/dashboard_components/GetTopWinner";
import GetOddsOutliers from "../components/dashboard_components/GetOddsOutliers";
import useCSV from "../hooks/useCSV";
import {getBetWon, getTop, sortRows} from "../utils/assistFunctions";
import GetTopWinnerBetStatus from "../components/dashboard_components/GetTopWinnerBetStatus";
import GetTopWinnerWinRate from "../components/dashboard_components/GetTopWinnerWinRate";
import GetCustomPlayerData from "../components/dashboard_components/GetCustomPlayerData";
import MyInput from "../components/UI/input/MyInput";
import GetDatesRages from "../components/dashboard_components/GetDatesRages";

const Dashboard = () => {
    const {data}: any = useCSV()   
    
    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])

    let val = 0;
    getTop(sortedData, 1).map((key: any) => {
        val = key["Player_no"]
    })

    const [player, setPlayer] = useState(val)
    
    return (
        <>
            <h3>HERE IS ADMIN DASHBOARD</h3>
            <label htmlFor="Player_no">Player no: </label>
            <MyInput 
                value={player}
                name="Player_no"
                placeholder="Enter Player_no here.."
                autoComplete="off"
                onChange={(e) => setPlayer(e.target.value)}
            />
            <div style={{display: "flex", margin: 20,}}>
                <GetTop10Winners sortedData={sortedData}/>
                <GetTopWinner/>
            </div>
            <div style={{display: "flex", margin: 20}}>
                
                {player ? 
                    <GetTopWinnerBetStatus topWinner={player} /> : <h3>NO PLAYER DATA</h3> 
                }

                {player ? 
                    <GetTopWinnerWinRate topWinner={player} />
                    :
                    <h3>NO PLAYER DATA</h3>
                }
            </div>           
             <div style={{display: "block", margin: 20}}>
                <GetOddsOutliers/>
            </div>
            <div>
                {player ? 
                    <GetCustomPlayerData topWinner={player} 
                    /> : 
                    <h3>NO PLAYER DATA</h3>
                }
                <GetDatesRages />
            </div>
        </>
    );
};

export default Dashboard;