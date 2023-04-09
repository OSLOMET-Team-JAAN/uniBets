import React, {useMemo, useState} from 'react';
import {Bar, BarChart, Label, LabelList, ResponsiveContainer, Tooltip, TooltipProps, XAxis} from "recharts";
import st from "../../styles/layout/GetTopWinners.module.css";
import useCSV from "../../hooks/useCSV";
import {getTop, sortRows} from "../../utils/assistFunctions";


type Props = {
    myTop: number | string
}

const GetBetsWinRateTopWinners = ({ myTop}: Props) => {
    const {data}: any = useCSV();

    const getWinnerData = (Player: number) => {
        let bet_total=0;
        let bet_won = 0;
        let bet_lost = 0;
        const getWinner = data.filter((obj: any) => {
            if(obj.Player_no === Player){
                bet_total += 1;
                return obj.Player_no;
            }
        })
        
        getWinner.filter((obj: any) => {
            if(obj.BET_OUTCOME === 'Bet Won'){
                bet_won += 1;
            }
            if(obj.BET_OUTCOME === 'Bet Lost'){
                bet_lost += 1;
            }
        })
        
        return {
            Player: Player,
            Bets_Total: bet_total,
            Bets_Won: bet_won,
            Bets_lost: bet_lost,
            Win_Rate: Math.round((bet_won / bet_total) * 100),
            Lost_Rate: Math.round((bet_lost / bet_total) * 100),
        }
    }

    const array = data.map((obj: any) => getWinnerData(obj.Player_no))

    const results = array.filter((obj: any, index: number, self: any) =>
            index === self.findIndex((obj2: any) => (
                obj2.Player === obj.Player
            ))
    )

    const [sortSettings] =
        useState({order: 'desc', orderBy: 'Bets_Total'});
    const sortedData = useMemo(() =>
        sortRows(results, sortSettings), [data, sortSettings]);

    const [sortSettings2] =
        useState({order: 'desc', orderBy: 'Win_Rate'});
    const sortedData2 = useMemo(() =>
        sortRows(sortedData, sortSettings2), [data, sortSettings2])

    const getTopData = getTop(sortedData2, myTop)
    
    

    const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <React.Fragment>
                    {payload.map((pld, index) => (
                        <div className={st.customTooltip} key={index}>
                            <p className="label" key={`player`}>
                                Player_no:  
                                <strong>{pld.payload.Player}</strong></p>
                            <p style={{color: "gray"}} key={`total`}>
                                Total bets:  
                                <strong>{pld.payload.Bets_Total}</strong></p>
                            <p style={{color: "red"}} key={`won`}>
                                Bets won:  
                                <strong>{pld.payload.Bets_Won}</strong></p>
                            <p style={{color: "gray"}} key={`lost`}>
                                Bets lost: 
                                <strong>{pld.payload.Bets_Lost}</strong></p>
                            <p style={{color: "gray"}} key={`winRate`}>
                                Win Rate: 
                                <strong>{pld.payload.Win_Rate}</strong></p>
                            <p style={{color: "gray"}} key={`lostRate`}>
                                Lost rate: 
                                <strong>{pld.payload.Lost_Rate}</strong></p>
                            
                        </div>
                    ))}
                </React.Fragment>
            );
        }
        return null;
    };
    
    return (
        <>
            <div className={st.cont}>
                <h4>TOP <strong>{myTop}</strong> WINNERS BY WINRATE & BETS AMOUNT</h4>
                <ResponsiveContainer
                    height={300}
                    minWidth={600}
                >
                    <BarChart
                        width={400}
                        data={getTopData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20
                        }}
                    >
                        <XAxis
                            dataKey="Player"
                            name="Player_no"
                        >
                            <Label
                                value="Player"
                                offset={-10} 
                                position="insideBottom"/>
                        </XAxis>
                        <Tooltip
                            offset={20}
                            content={<CustomTooltip
                                cursor={{fill: "transparent"}}

                            />}/>
                        <Bar
                            dataKey="Bets_Won"
                            stackId="a"
                            fill="teal">
                            <LabelList
                                dataKey="Bets_Won" position="top"
                            />
                        </Bar>
                        <Bar
                            dataKey="Bets_Lost"
                            stackId="b"
                            fill="teal"
                            hide={true}>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
};

export default GetBetsWinRateTopWinners;