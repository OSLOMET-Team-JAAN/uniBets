import React, {useMemo} from 'react';
import useCSV from "../../hooks/useCSV";
import {PieChart, Pie, Label,} from 'recharts';


interface Props {
    Player: number
}

//This component will check for date-time ranges
//It can help us to suppose if there any bot was used or not
const GetDatesRages = ({Player}: Props) => {
    console.log(Player)
    const {data}: any = useCSV();
    
    const reformatPlayerData = () => {
        const getPlayerData = data.filter((obj: any) => {
            if (obj.Player_no === Player) {
                return obj.Player_no
            }
        });
        
        const getBetPlacedDates = getPlayerData.map((obj: any) => {
            return obj.BET_PLACED_DATE
        });
        
        const getEventName = getPlayerData.map((obj: any) => {
            return obj.EVENT_NAME;
        });
        
        const getSeconds = () => {
            return getBetPlacedDates.slice(1).map((date: any, index: number) => {
                const seconds = (Date.parse(date) - Date.parse(getBetPlacedDates[index]))/1000;
                if(seconds > 60){
                    return
                }
                return seconds;
            }).filter(Number).sort().map((key: number) => {
                return {
                    sec: key
                }
            });
            //Last map require to convert array<number> to array<object> which is used in recharts
        }
        
        return [
            {
                _Player: Player,
                Event: getEventName,
                Dates: getBetPlacedDates,
                Time_Range: getSeconds()               
            }
        ]
    }
    
    useMemo(() => {reformatPlayerData()},[Player])

    return (
        <>
            <h4>Player <strong>{Player}</strong> Bet Setting Time Ranges (sec)</h4>
            <p>Presented only what is &lsaquo; 60 sec</p>
            <p>NB! If there is no any data: it's mean there is only 1 bet or &rsaquo; 60 sec</p>
            
            <PieChart 
                width={300} 
                height={300}>
                <Pie
                    dataKey="sec"
                    startAngle={180}
                    endAngle={0}
                    data={reformatPlayerData()[0].Time_Range}
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    fill="teal"
                    label
                />
            </PieChart>
            
        </>
    );
};

export default GetDatesRages;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
