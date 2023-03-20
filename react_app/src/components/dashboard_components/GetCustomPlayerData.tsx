import React from 'react';
import useCSV from "../../hooks/useCSV";
import UseCSVHeaders from "../../hooks/useCSVHeaders";
import MyTable from "../table/MyTable";

interface Props{
    topWinner: number
}
const GetCustomPlayerData = ({topWinner}: Props) => {
    const { data }: any = useCSV();
    const { csvHeaders }: any = UseCSVHeaders();

    const getTopWinnerData = data.filter((obj: any) => {
        if(obj.Player_no === topWinner){
            return obj
        }
    })
    console.log(getTopWinnerData)
    
    
    return (
        <div style={{display: "block", margin: 5, padding: 20}}>
            <h4>PLAYER <strong>{topWinner}</strong> BETS DATA</h4>
           <MyTable  
               columns={csvHeaders} 
               rows={getTopWinnerData}/>
        </div>
    );
};

export default GetCustomPlayerData;