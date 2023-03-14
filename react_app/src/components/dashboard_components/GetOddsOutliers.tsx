import React, {useMemo, useState} from 'react';
import useCSV from "../../hooks/useCSV";
import {getBetWon, getTop, sortRows} from "../../utils/assistFunctions";
import { Legend, Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

const GetOddsOutliers = () => {
    const {data}: any = useCSV();

    const [sortSettings, setSortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])

    const isGreaterThreshold = (array: any, value: number) => array.filter((v: any) => v.ODDS > value)
    const getOutliers = isGreaterThreshold(sortedData, 2);
    const getTopValue = () =>
    {
        getTop(getOutliers, 1).map((item: any) => (
            <span>{item.ODDS}</span>))

    }


    return (
            <div>
                <h4>ODDS OUTLIERS CHART</h4>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={getOutliers}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="Player_no" />
                        <YAxis
                            type="number"
                            domain={[0, 20]}
                        />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ODDS" stroke="teal" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
    );
};

export default GetOddsOutliers;