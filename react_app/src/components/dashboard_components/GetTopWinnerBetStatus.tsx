import React from 'react';
import {Pie, ResponsiveContainer, PieChart, Label, Cell} from "recharts";
import useCSV from "../../hooks/useCSV";

interface Props{
    topWinner: number
}

const GetWinRateTopWinner = ({topWinner}: Props) => {
    const {data}:any = useCSV();
    
    let total_bet_counter = 0;
    let win_bet_counter = 0;
    let lost_bet_counter = 0;
    const getTopWinnerData = data.filter((obj: any) => {
        if(obj.Player_no === topWinner){
            total_bet_counter += 1
            return obj.Player_no
        }
    })
    getTopWinnerData.filter((obj: any) => {
        if(obj.BET_OUTCOME === "Bet Won"){
            win_bet_counter += 1;
        }
        if(obj.BET_OUTCOME === "Bet Lost"){
            lost_bet_counter += 1;
        }
    })
   
    //---- Custom Label for Pie Chart ------
    const CustomLabel = ({ viewBox, betsWon = 0 }: any) => {
        const { cx, cy } = viewBox;
        return (
            <React.Fragment >                
                    <text x={cx - 15} y={cy - 5} >
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
    
    
    const Results= [
        // {name: 'Total bets', value: total_bet_counter},
        {name: 'Bets Won', value: win_bet_counter},
        {name: 'Bets Lost', value: lost_bet_counter},
    ]
    
    
    return (
        <div style={{display: "block", margin: 5, padding: 5}}>
            <h4>PLAYER <strong>{topWinner}</strong> BETS STATUS</h4>        
            <h5><strong>Player:&nbsp;</strong> {topWinner} &nbsp;have made total 
                <strong>{total_bet_counter}</strong> bets</h5>
                
                        <PieChart 
                            height={250}
                            width={200}
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
                                    if (index === 1 || index === 2) { 
                                        return <Cell key={`cell-${index}`} fill="#f3f6f9" />;
                                    }
                                    return <Cell key={`cell-${index}`} fill="green" />;
                                })}
                                <Label
                                    content={
                                    <CustomLabel
                                        betsWon={Results[0].value} 
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