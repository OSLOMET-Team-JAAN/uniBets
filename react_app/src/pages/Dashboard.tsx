import React from 'react';
import GetTop10Winners from "../components/dashboard_components/GetTop10Winners";
import GetTopWinner from "../components/dashboard_components/GetTopWinner";
import GetOddsOutliers from "../components/dashboard_components/GetOddsOutliers";
import GetAllBetWon from "../components/dashboard_components/GetAllBetWon";

const Dashboard = () => {

    return (
        <>
            <h3>HERE IS ADMIN DASHBOARD</h3>
            <div style={{display: "flex",margin: 20}}>
                <GetTop10Winners />
                <GetTopWinner />
            </div>
            <div style={{display: "block", margin: 20}}>
                <GetOddsOutliers />
                <GetAllBetWon />
            </div>
        </>
    );
};

export default Dashboard;