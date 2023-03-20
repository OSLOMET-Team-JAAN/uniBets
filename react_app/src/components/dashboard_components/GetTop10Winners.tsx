import React, {useMemo, useState} from 'react';
import {filterRows, getBetWon, getTop, sortRows} from "../../utils/assistFunctions";
import useCSV from "../../hooks/useCSV";
import {
    Bar,
    BarChart,
    Label,
    LabelList,
    ResponsiveContainer,
    Tooltip,
    XAxis,
} from "recharts";
import {ICSVdata} from "../../models/ICSVdata";

type Props = {
    sortedData: ICSVdata[]
}

const GetTop10Winners = ({sortedData}: Props) => {
    const {data}: any = useCSV();    
    const getTop10 = getTop(sortedData, 10)

    return (
        <div>
            <h4>TOP 10 WINNERS</h4>
                        
                <BarChart
                    height={200}
                    width={400}
                    data={getTop10}
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
                            offset={5} position="insideBottom"/>
                    </XAxis>
                    <Tooltip/>
                    <Bar
                        dataKey="ODDS"
                        stackId="a"
                        fill="teal">
                        <LabelList
                            dataKey="ODDS" position="top"
                        />
                    </Bar>
                </BarChart>
        </div>

    );
};

export default GetTop10Winners;