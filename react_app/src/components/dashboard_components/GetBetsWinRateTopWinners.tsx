import React, {FC, useMemo, useState} from 'react';
import {Bar, BarChart, Label, LabelList, ResponsiveContainer, Tooltip, TooltipProps, XAxis} from "recharts";
import st from "../../styles/GetBetsWinRateTopWinners.module.css";
import useCSV from "../../hooks/useData";
import {getTop} from "../../utils/assistFunctions";
import MyDropDown from "../UI/select/MyDropDown";


type Props = {
    myTop: number | string
}

type Player = {
    Player: number | string;
    TOTAL_BETS: number;
    BETS_WON: number;
    BETS_LOST: number;
    WIN_RATE: number;
    LOST_RATE: number;
};

const GetBetsWinRateTopWinners: FC<Props> = ({ myTop}) => {
    const {data}: any = useCSV();

    const getWinnerData = useMemo(() => (Player: number) => {
        let bet_total = 0;
        let bet_won = 0;
        let bet_lost = 0;
        const getWinner = data.filter((obj: any) => {
            if (obj.Player_no === Player) {
                bet_total += 1;
                return obj.Player_no;
            }
        })
        getWinner.filter((obj: any) => {
            if (obj.BET_OUTCOME === 'Bet Won') {
                bet_won += 1;
            }
            if (obj.BET_OUTCOME === 'Bet Lost') {
                bet_lost += 1;
            }
        })
        return {
            Player: Player,
            TOTAL_BETS: bet_total,
            BETS_WON: bet_won,
            BETS_LOST: bet_lost,
            WIN_RATE: Math.round((bet_won / bet_total) * 100),
            LOST_RATE: Math.round((bet_lost / bet_total) * 100),
        }
    }, [data]);

    const array = useMemo(() => data?.map((obj: any) => getWinnerData(obj.Player_no)), [data, getWinnerData])

    const results: Player[] = useMemo(() => array.filter((obj: any, index: number, self: any) =>
            index === self.findIndex((obj2: any) => (
                obj2.Player === obj.Player
            ))
    ), [array]);

    const [sortedPlayers, setSortedPlayers] = useState<Player[]>(results);
    const [orderBy, setOrderBy] = useState<keyof Player>('TOTAL_BETS');

    const sortPlayers = (property: keyof Player) => {
        const sorted = [...sortedPlayers].sort((a, b) =>
            b[property] > a[property] ? 1 : a[property] > b[property] ? -1 : 0
            //returns 1 if the value of b[property] is greater than that of a[property], 
            // returns -1 if the value of a[property] is greater than that of b[property], 
            // returns 0 if the values are equal.
        );
        setSortedPlayers(sorted);
    };

    useMemo(() => sortPlayers(orderBy), [orderBy]);
    
    const getTopData = getTop(sortedPlayers, myTop);
    
    
    const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <React.Fragment>
                    {payload.map((pld, index) => (
                        <div className={st.customTooltip} key={index}>
                            <p className="label" key={`player`}>
                                Player_no:  
                                <strong> {pld.payload.Player}</strong></p>
                            <p style={{color: "gray"}} key={`total`}>
                                Total bets:  
                                <strong> {pld.payload.TOTAL_BETS}</strong></p>
                            <p style={{color: "red"}} key={`won`}>
                                Bets won:  
                                <strong> {pld.payload.BETS_WON}</strong></p>
                            <p style={{color: "gray"}} key={`lost`}>
                                Bets lost: 
                                <strong> {pld.payload.BETS_LOST}</strong></p>
                            <p style={{color: "gray"}} key={`winRate`}>
                                Win Rate: 
                                <strong> {pld.payload.WIN_RATE}</strong></p>
                            <p style={{color: "gray"}} key={`lostRate`}>
                                Lost rate: 
                                <strong> {pld.payload.LOST_RATE}</strong></p>
                        </div>
                    ))}
                </React.Fragment>
            );
        }
        return null;
    };
    
    return (
        <>
            <div className={Number.isNaN(myTop) ? st.errCont : st.cont}>
                {Number.isNaN(myTop) 
                    ? <h4>PLEASE CUSTOMIZE YOUR TOP</h4>
                    : 
                    <>
                        <div className={st.title}>
                            <h4>TOP <strong>{myTop}</strong> WINNERS BY {
                                orderBy !== "TOTAL_BETS" ? "TOTAL BETS &" : null
                            } </h4>
                            <MyDropDown
                                name='filter'
                                defaultValue={`Sort by..`}
                                options={[
                                    {value: 'TOTAL_BETS', label: 'Total Bets'},
                                    {value: 'BETS_WON', label: 'Bets Won'},
                                    {value: 'WIN_RATE', label: 'Win Rate'},
                                ]}
                                value={orderBy}
                                onChange={setOrderBy}
                            />
                        </div>
                        <ResponsiveContainer
                            height={300}
                            minWidth={300}
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
                                    dataKey={orderBy === "WIN_RATE" ? "BETS_WON" : orderBy}
                                    stackId="a"
                                    fill="teal">
                                    <LabelList
                                        dataKey={orderBy}
                                        position="top"
                                    />
                                </Bar>
                                <Bar
                                    dataKey="BETS_LOST"
                                    stackId="b"
                                    fill="teal"
                                    hide={true}>
                                    <LabelList
                                        dataKey="BETS_LOST"
                                        position="top"
                                    />
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </>
                }                
            </div>
        </>
    );
};

export default GetBetsWinRateTopWinners;