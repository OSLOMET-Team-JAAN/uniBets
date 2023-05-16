import React, {FC, useMemo} from 'react';
import {Cell, Label, Pie, PieChart} from "recharts";
import useCSV from "../../hooks/useData";
import style from '../../styles/GetTopWinnerBetStatus.module.css';
import {getResults} from "../../utils/assistFunctions";

interface Props {
    Player: string | number
}

const GetWinRateTopWinner: FC<Props> = ({Player}) => {
    const {data}: any = useCSV();
    const Results = useMemo(() => getResults(data, Player),[Player]);
    
    //---- Custom Label for Pie Chart ------
    const CustomLabel = ({viewBox, betsWon = 0}: any) => {
        const {cx, cy} = viewBox;
        return (
            <React.Fragment>
                <text x={cx - 15} y={cy - 5}>
                    <tspan
                        className={style.tspan}
                    >
                        {betsWon}
                    </tspan>
                </text>
                <text x={cx - 50} y={cy + 15}>
                    <tspan
                        className={style.tspan2}
                    >
                        TOTAL BETS WON
                    </tspan>
                </text>
            </React.Fragment>
        );
    };


    return (

        <div className={style.cont}>
            <h4>PLAYER <strong>{Player}</strong> BETS STATUS</h4>

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