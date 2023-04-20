import React from 'react';
import MyTable from "../table/MyTable";
import useCSV from "../../hooks/useCSV";
import st from '../../styles/GetCustomPlayerData.module.css';


interface Props{
    Player: number | string
}

const GetCustomPlayerData = ({Player}: Props) => {
    const {data, headers}:any = useCSV();

    const getTopWinnerData = data.filter((obj: any) => {
        if(obj.Player_no === Player){
            return obj
        }
    })
    
    
    return (

        <div className={st.table }>
            <h4>PLAYER <strong>{Player}</strong> BETS DATA</h4>
           <MyTable  
               columns={headers} 
               rows={getTopWinnerData}/>
            </div>
  
    );
};

export default GetCustomPlayerData;