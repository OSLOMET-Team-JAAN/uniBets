import React, {useMemo} from 'react';
import useCSV from "../../hooks/useCSV";
import {Pie, PieChart,} from 'recharts';
import st from '../../styles/GetDatesIntervals.module.css';


interface Props {
    Player: number | string
}

//This component will check for date-time ranges
//It can help us to suppose if there any bot was used or not
const GetDatesIntervals = ({Player}: Props) => {
    const {data}: any = useCSV();
    
    const reformatPlayerData = () => {
        const getPlayerData = data.filter((obj: any) => {
            if (obj.Player_no === Player) {
                return obj.Player_no
            }
        });
        
        const getBetPlacedDates = getPlayerData.map((obj: any) => {
            return obj.BET_PLACED_DATE
        }).sort();
        
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
            {reformatPlayerData()[0].Time_Range != 0 ? 
                <div className={st.cont}>
                    <h4>PLAYER <strong>{Player}</strong> BET SETTING TIME INTERVALS &lsaquo; 60 sec (sec)</h4>
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
                </div>
                :
                <div className={st.cont2}>
                    <h4 style={{color: "red"}}>NB! If no data - there is only 1 bet or all intervals are &rsaquo; 60 sec</h4>
                </div>
            }
            
        </>
    );
};

export default GetDatesIntervals;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
