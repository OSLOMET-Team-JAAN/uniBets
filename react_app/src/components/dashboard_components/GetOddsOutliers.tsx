import React, {useMemo, useState} from 'react';
import {getBetWon, getTop, sortRows} from "../../utils/assistFunctions";
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import useCSV from "../../hooks/useCSV";
import st from '../../styles/GetOddsOutliers.module.css';

const GetOddsOutliers = () => {
    const {data}: any = useCSV();

    const [sortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])

    const isGreaterThreshold = (array: any, value: number) => array.filter((v: any) => v.ODDS > value)
    const getOutliers = isGreaterThreshold(sortedData, 2);
    //-- Find max ODDS value for property domain of LineChart (to change default high limit)
    const getTopValue = () => {
        let val;
        getTop(getOutliers, 1).map((key: any) => {
                val = key["ODDS"]
            }
        )
        return val;
    }


    return (
        <div className={st.cont}>
            <h4 style={{fontStyle: 'italic'}}>WON ODDS OUTLIERS CHART</h4>
            <ResponsiveContainer
                height={300}
            >
                <LineChart
                    width={600}
                    data={getOutliers}
                    margin={{
                        top: 5,
                        right: 20,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    <XAxis dataKey="Player_no"/>
                    <YAxis
                        type="number"
                        domain={[0, getTopValue]}
                    />
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="ODDS" stroke="teal"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GetOddsOutliers;