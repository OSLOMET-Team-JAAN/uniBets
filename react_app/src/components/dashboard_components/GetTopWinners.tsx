import React from 'react';
import { getTop} from "../../utils/assistFunctions";
import {
    Bar,
    BarChart,
    Label,
    LabelList,
    Tooltip,
    XAxis,
    TooltipProps, ResponsiveContainer,
} from "recharts";
import {ICSVdata} from "../../models/ICSVdata";
import st from '../../styles/GetTopWinners.module.css';

type Props = {
    sortedData: ICSVdata[],
    myTop: number
}

const GetTop10Winners = ({sortedData, myTop}: Props) => {   
    const getTopData = getTop(sortedData, myTop)

    const CustomTooltip = ({
                               active,
                               payload,
                               label,
                           }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            return (                   
                    <React.Fragment>
                        {payload.map((pld, index) => (
                            <div className={st.customTooltip} key={index}>
                                <p className="label" key={`label`}>Player_no: <strong>{label}</strong></p>
                                <p style={{ color: "red" }} key={`odd`}>{pld.dataKey}: <strong>{pld.value}</strong></p>
                                <p style={{ color: "gray" }} key={`event`}>Event: <strong>{pld.payload.EVENT_NAME}</strong></p>
                            </div>
                        ))}
                    </React.Fragment>
            );
        }

        return null;
    };
    

    return (
        <>
            <h4>TOP <strong>{myTop}</strong> WINNERS</h4>
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
                        cursor={{ fill: "transparent" }}
                        
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
                        hide={true} >
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </>

    );
};

export default GetTop10Winners;