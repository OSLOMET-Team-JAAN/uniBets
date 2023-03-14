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


const GetTop10Winners = () => {
    const {data}: any = useCSV();

    const [sortSettings, setSortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])
    const getTop10 = getTop(sortedData, 10)

    return (
        <div>
            <h4>TOP 10 WINNERS</h4>
            <ResponsiveContainer height={200} minWidth={400}>
                <BarChart
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
                            offset={-5} position="insideBottom" />
                    </XAxis>
                    <Tooltip />
                    <Bar
                        dataKey="ODDS"
                        stackId="a"
                        fill="teal">
                        <LabelList
                            dataKey="ODDS" position="top"
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>

    );
};

export default GetTop10Winners;