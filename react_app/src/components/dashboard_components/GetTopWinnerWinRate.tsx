import React, {FC, useEffect, useMemo, useState} from 'react';
import {Cell, Label, Pie, PieChart} from "recharts";
import useCSV from "../../hooks/useData";
import style from '../../styles/GetTopWinnerWinRate.module.css';
import {getResults, getWinRate} from "../../utils/assistFunctions";

interface Props {
    Player: string | number;
}

const GetTopWinnerWinRate: FC<Props> = ({Player}) => {
    const {data}: any = useCSV();
    
    const Results = useMemo(() => getResults(data, Player), [Player]);
    const WinRate = useMemo(() => getWinRate(data, Player),[Player]);

    //---- Custom Label for Pie Chart ------
    const CustomLabel = ({viewBox, betsWon = 0}: any) => {
        const {cx, cy} = viewBox;
        return (
            <React.Fragment>
                <text x={cx - 45} y={cy - 5}>
                    <tspan
                        className={style.tspan}
                    >
                        {betsWon}%
                    </tspan>
                </text>
                <text x={cx - 35} y={cy + 25}>
                    <tspan
                        className={style.tspan2}
                    >
                        WIN RATE
                    </tspan>
                </text>
            </React.Fragment>
        );
    };

    return (
        <div className={style.cont}>
            <h4>PLAYER <strong>{Player}</strong> WIN RATE</h4>

            <PieChart
                width={400}
                height={250}
            >
                <Pie
                    data={WinRate}
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={90}
                >
                    {Results.map((entry, index) => {
                        if (index === 1 || index === 2) {
                            return <Cell
                                key={`cell-${index}`}
                                fill="#f3f6f9"/>;
                        }
                        return <Cell
                            key={`cell-${index}`}
                            fill="green"/>;
                    })}
                    <Label
                        content={
                            <CustomLabel
                                betsWon={WinRate[0].value}
                            />}
                        position="center"
                    />
                </Pie>
            </PieChart>
        </div>
    );
};

export default GetTopWinnerWinRate;