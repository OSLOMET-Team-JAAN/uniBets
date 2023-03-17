import React, {useMemo, useState} from 'react';
import GetTop10Winners from "../components/dashboard_components/GetTop10Winners";
import GetTopWinner from "../components/dashboard_components/GetTopWinner";
import GetOddsOutliers from "../components/dashboard_components/GetOddsOutliers";
import GetAllBetWon from "../components/dashboard_components/GetAllBetWon";
import useCSV from "../hooks/useCSV";
import {getBetWon, getTop, sortRows} from "../utils/assistFunctions";
import GetTopWinnerBetStatus from "../components/dashboard_components/GetTopWinnerBetStatus";
import GetTopWinnerWinRate from "../components/dashboard_components/GetTopWinnerWinRate";

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
    

    return (
        <>
            <h3>HERE IS ADMIN DASHBOARD</h3>
            <div style={{display: "flex", margin: 20}}>
                <GetTop10Winners/>
                <GetTopWinner/>
                <GetTopWinnerBetStatus topWinner={val} />
                <GetTopWinnerWinRate topWinner={val} />
            </div>
            <div style={{display: "block", margin: 20}}>
                <GetOddsOutliers/>
                <GetAllBetWon/>
            </div>
        </>
    );
};

export default Dashboard;