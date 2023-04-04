import React from 'react';
import MyTable from "../table/MyTable";
import useCSV from "../../hooks/useCSV";
import st from '../../styles/layout/TopWinner.module.css';


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

        <div className={st.tabl }>
            <h4>PLAYER <strong>{topWinner}</strong> BETS DATA</h4>
           <MyTable  
               columns={headers} 
               rows={getTopWinnerData}/>
            </div>
  
    );
};

export default GetCustomPlayerData;