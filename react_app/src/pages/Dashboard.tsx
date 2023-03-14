import React from 'react';
import GetAllBetWon from "../../../UniBets/react_app/src/components/dashboard_components/GetAllBetWon";
import GetTop10Winners from "../../../UniBets/react_app/src/components/dashboard_components/GetTop10Winners";
import GetTopWinner from "../../../UniBets/react_app/src/components/dashboard_components/GetTopWinner";
import GetOddsOutliers from "../../../UniBets/react_app/src/components/dashboard_components/GetOddsOutliers";

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