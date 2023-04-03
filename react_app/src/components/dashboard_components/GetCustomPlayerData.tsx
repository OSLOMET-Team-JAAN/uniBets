import React from 'react';
import MyTable from "../table/MyTable";
import useCSV from "../../hooks/useCSV";


interface Props{
    topWinner: number
}

const GetCustomPlayerData = ({topWinner}: Props) => {
    const {data, headers}:any = useCSV();

    const getTopWinnerData = data.filter((obj: any) => {
        if(obj.Player_no === topWinner){
            return obj
        }
    })
    
    
    return (
     
        <div style={{display: "block", margin: 5, padding: 20}}>
            <h4>PLAYER <strong>{topWinner}</strong> BETS DATA</h4>
           <MyTable  
               columns={headers} 
               rows={getTopWinnerData}/>
            </div>
  
    );
};

export default GetCustomPlayerData;