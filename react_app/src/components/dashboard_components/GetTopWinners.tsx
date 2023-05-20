import React, {FC} from 'react';
import {getTop} from "../../utils/assistFunctions";
import {Bar, BarChart, Label, LabelList, ResponsiveContainer, Tooltip, TooltipProps, XAxis,} from "recharts";
import {ICSVdata} from "../../models/ICSVdata";
import st from '../../styles/layout/GetTopWinners.module.css';

type Props = {
    sortedData: ICSVdata[],
    myTop: number
}

const GetTopWinners: FC<Props> = ({sortedData, myTop}) => {
    //Customized top
    const getTopData = getTop(sortedData, myTop)
    
    //Customizing tooltips for chart
    const CustomTooltip = ({
                               active,
                               payload,
                           }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (
                <React.Fragment>
                    {payload.map((pld, index) => (
                        <div 
                            className={st.customTooltip} 
                            key={index}>
                            <p 
                                style={{color: "grey"}} 
                                key={`player`}>
                                Player_no:
                                <strong> {pld.payload.Player_no}</strong></p>
                            <p 
                                style={{color: "red"}} 
                                key={`odds`}>
                                ODD:
                                <strong> {pld.payload.ODDS}</strong></p>
                            <p 
                                style={{color: "grey"}} 
                                key={`event`}>
                                Event:
                                <strong> {pld.payload.EVENT_NAME}</strong></p>
                            <p 
                                style={{color: "grey"}} 
                                key={`league`}>
                                League:
                                <strong> {pld.payload.LEAGUE}</strong></p>
                            <p 
                                style={{color: "red"}} 
                                key={`outcome`}>
                                Bet outcome:
                                <strong> {pld.payload.BET_OUTCOME}</strong></p>
                        </div>
                    ))}
                </React.Fragment>
            );
        }

        return null;
    };

    return (
        <>
            <div className={ Number.isNaN(myTop) ? st.errCont : st.cont}>
                <h4>TOP <strong>{myTop}</strong> WINNERS BY HIGHEST ODDS</h4>
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
                            bottom: 5
                        }}
                    >
                        <XAxis
                            dataKey="Player_no"
                            name="Player_no"
                        >
                            <Label
                                value="Player_no"
                                offset={-5} position="insideBottom"/>
                        </XAxis>
                        <Tooltip
                            offset={20}
                            content={<CustomTooltip
                                cursor={{fill: "transparent"}}

                            />}/>
                        <Bar
                            dataKey="ODDS"
                            stackId="a"
                            fill="teal">
                            <LabelList
                                dataKey="ODDS" position="top"
                            />
                        </Bar>
                        <Bar
                            dataKey="EVENT_NAME"
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

export default GetTopWinners;