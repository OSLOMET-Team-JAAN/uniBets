import React from 'react';
import { Cell, Label, Pie, PieChart, ResponsiveContainer } from "recharts";
import useCSV from "../../hooks/useCSV";

interface Props {
    topWinner: number
}

const GetTopWinnerWinRate = ({ topWinner }: Props) => {
    const { data }: any = useCSV();

    let total_bet_counter = 0;
    let win_bet_counter = 0;
    let lost_bet_counter = 0;
    const getTopWinnerData = data.filter((obj: any) => {
        if (obj.Player_no === topWinner) {
            total_bet_counter += 1
            return obj.Player_no
        }
    })
    getTopWinnerData.filter((obj: any) => {
        if (obj.BET_OUTCOME === "Bet Won") {
            win_bet_counter += 1;
        }
        if (obj.BET_OUTCOME === "Bet Lost") {
            lost_bet_counter += 1;
        }
    })

    //---- Custom Label for Pie Chart ------
    const CustomLabel = ({ viewBox, betsWon = 0 }: any) => {
        const { cx, cy } = viewBox;
        return (
            <React.Fragment >
                <text x={cx - 45} y={cy - 5} >
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


    const Results = [
        // {name: 'Total bets', value: total_bet_counter},
        { name: 'Bets Won', value: win_bet_counter },
        { name: 'Bets Lost', value: lost_bet_counter },
    ]

    const WinRate = [
        { name: 'Win Rate', value: Math.round((win_bet_counter / total_bet_counter) * 100) },
        { name: 'Lost Rate', value: Math.round((lost_bet_counter / total_bet_counter) * 100) },
    ]


    return (
        <div style={{ display: "block", margin: 5, padding: 5 }}>
            <h4>PLAYER <strong>{topWinner}</strong> WIN RATE</h4>

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
                                fill="#f3f6f9" />;
                        }
                        return <Cell
                            key={`cell-${index}`}
                            fill="green" />;
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