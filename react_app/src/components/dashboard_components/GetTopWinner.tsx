import React, {useMemo, useState} from 'react';
import {getBetWon, getTop, sortRows} from "../../utils/assistFunctions";
import useCSV from "../../hooks/useCSV";
import style from '../../styles/layout/TopWinner.module.css';

const GetTopWinner = () => {
    const {data}:any = useCSV();

    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])
    const topWinner = getTop(sortedData, 1)

    return (
        <div className={style.cont}>
            <h4> TOP Player Winner Number </h4>
            <br />
            <br />
            <div className={style.box} >
                {topWinner.map((key: any, i: number) =>
                    <div key={i}
                       >
                        {key.Player_no}
                    </div>
                )}
            </div>
        </div>
    );
};

export default GetTopWinner;