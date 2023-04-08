import React, {useMemo} from 'react';
import {Cell, Label, Pie, PieChart} from "recharts";
import useCSV from "../../hooks/useCSV";
import style from '../../styles/layout/PieStyle.module.css';
import {getResults, getWinRate} from "../../utils/assistFunctions";

interface Props {
    Player: number
}

const GetTopWinnerWinRate = ({Player}: Props) => {
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
                        style={{
                            fontWeight: 700,
                            fontSize: "2.5em",
                            fill: "#2B5CE7",
                            fontFamily: "Roboto"
                        }}
                    >
                        {betsWon}%
                    </tspan>
                </text>
                <text x={cx - 35} y={cy + 25}>
                    <tspan
                        style={{
                            fontWeight: 700,
                            fontSize: "0.8em",
                            fill: "#A9A9A9",
                            fontFamily: "Roboto"
                        }}
                    >
                        WIN RATE
                    </tspan>
                </text>
            </React.Fragment>
        );
    };

    return (
        <div className={style.cont}>
            <h4>Player <strong>{Player}</strong> Win Rate</h4>

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