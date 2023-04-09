import React, {useMemo} from 'react';
import {Cell, Label, Pie, PieChart} from "recharts";
import useCSV from "../../hooks/useCSV";
import style from '../../styles/layout/PieStyle.module.css';
import {getResults} from "../../utils/assistFunctions";

interface Props {
    Player: number | string
}

const GetWinRateTopWinner = ({Player}: Props) => {
    const {data}: any = useCSV();

    console.log(data)
    const Results = useMemo(() => getResults(data, Player),[Player])
    console.log(Results)
    //---- Custom Label for Pie Chart ------
    const CustomLabel = ({viewBox, betsWon = 0}: any) => {
        const {cx, cy} = viewBox;
        return (
            <React.Fragment>
                <text x={cx - 15} y={cy - 5}>
                    <tspan
                        style={{
                            fontWeight: 700,
                            fontSize: "3.5em",
                            fill: "#2B5CE7",
                            fontFamily: "Roboto"
                        }}
                    >
                        {betsWon}
                    </tspan>
                </text>
                <text x={cx - 50} y={cy + 15}>
                    <tspan
                        style={{
                            fontWeight: 700,
                            fontSize: "0.8em",
                            fill: "#A9A9A9",
                            fontFamily: "Roboto"
                        }}
                    >
                        TOTAL BETS WON
                    </tspan>
                </text>
            </React.Fragment>
        );
    };


    return (

        <div className={style.cont}>
            <h4>Player <strong>{Player}</strong> Bets Status</h4>

            <p><strong>Player&nbsp;</strong> {Player} &nbsp;have made total
                <strong> {Results[0].value}</strong> bets</p>

            <PieChart
                width={400}
                height={200}
            >
                <Pie
                    data={Results}
                    cx="50%"
                    cy="50%"
                    dataKey="value"
                    innerRadius={70}
                    outerRadius={90}
                >
                    {Results.map((entry, index) => {
                        if (index === 2 || index === 3) {
                            return <Cell key={`cell-${index}`} fill="#f3f6f9"/>;
                        }
                        return <Cell key={`cell-${index}`} fill="green"/>;
                    })}
                    <Label
                        content={
                            <CustomLabel
                                betsWon={Results[1].value}
                            />}
                        position="center"
                    />
                </Pie>
            </PieChart>

        </div>

    );
};

export default GetWinRateTopWinner;

//-https://celiaongsl.medium.com/2-secret-pie-chart-hacks-to-up-your-recharts-game-hack-recharts-1-9fa62ff9416a