import React, {useMemo, useState} from 'react';
import {getBetWon, getTop, sortRows} from "../../utils/assistFunctions";
import useCSV from "../../hooks/useCSV";

const GetTopWinner = () => {
    const {data}:any = useCSV();

    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])
    const topWinner = getTop(sortedData, 1)

    return (
        <div style={{display: "block", maxWidth: 200, margin: 20, padding: 20}}>
            <h4>TOP WINNER</h4>
            <div>
                {topWinner.map((key: any, i: number) =>
                    <div key={i}
                         style={{border: "1px solid teal", background: "peachpuff"}}>
                        {key.Player_no}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetTopWinner;