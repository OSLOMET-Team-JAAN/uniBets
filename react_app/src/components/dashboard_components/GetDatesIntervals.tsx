import React, {FC, useMemo} from 'react';
import useCSV from "../../hooks/useData";
import {Pie, PieChart,} from 'recharts';
import st from '../../styles/GetDatesIntervals.module.css';
import TipButton from "../UI/buttons/TipButton";

interface Props {
    Player: number | string
}

//This component will check for date-time ranges
//It can help us to suppose if there any bot was used or not
const GetDatesIntervals: FC<Props> = ({Player}) => {
    const {data}: any = useCSV();
    
    const reformatPlayerData = () => {
        const getPlayerData = data.filter((obj: any) => {
            if (obj.Player_no === Player) {
                return obj.Player_no
            }
            return;
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
                if(seconds > 20){
                    return;
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
    
    useMemo(() => {reformatPlayerData()},[Player]);
    
    return (
        <>
            {reformatPlayerData()[0].Time_Range != 0 ? 
                <div className={st.cont}>
                    <h4>PLAYER <strong>{Player}</strong> TIME INTERVALS BETWEEN BET PLACEMENTS &lsaquo; 20 sec (sec)</h4>
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
                        <TipButton title="Time intervals between bet placements">
                            <p style={{textAlign: "left"}}>
                                - The following widget is displaying the time intervals between bet placements (in seconds) for a specific player.<br/>
                                - There were used intervals less than 20 seconds only. <br/>
                                - If the widget displays these time intervals with amount of more than 3 bets, it can be inferred with a high degree of probability that bot or other external means were utilized. <br/>
                            </p>
                        </TipButton>
                </div>
                :
                <div className={st.cont2}>
                    <h4 style={{color: "red"}}>NB! If no data - there is only 1 bet or all intervals are &rsaquo; 20 sec</h4>
                </div>
            }            
        </>
    );
};

export default GetDatesIntervals;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
