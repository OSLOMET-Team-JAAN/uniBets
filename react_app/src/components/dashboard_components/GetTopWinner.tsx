import React, {FC, useMemo, useState} from 'react';
import {getBetWon, getTop, sortRows} from "../../utils/assistFunctions";
import useCSV from "../../hooks/useData";
import style from '../../styles/layout/TopWinner.module.css';

const GetTopWinner: FC = () => {
    const {data}: any = useCSV();
    
    //Sorting order
    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'});
    //Sorting data as per sorting order
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings]);
    //Getting TOP winner
    const topWinner = getTop(sortedData, 1)

    return (
        <div className={style.cont}>
            <h4> TOP WINNER PLAYER NUMBER </h4>
            <br/>
            <br/>
            <div className={style.box}>
                {topWinner?.map((key: any, i: number) =>
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