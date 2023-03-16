import React from 'react';
import useCSV from "../../hooks/useCSV";

interface Props{
    topWinner: number
}

const GetWinRateTopWinner = ({topWinner}: Props) => {
    const {data}: any = useCSV();
    let total_bet_counter = 0;
    let win_bet_counter = 0;
    let lost_bet_counter = 0;
    const getTopWinnerData = data.filter((obj: any) => {
        if(obj.Player_no === topWinner){
            total_bet_counter += 1
            return obj.Player_no
        }         
    })
    getTopWinnerData.filter((obj: any) => {
        if(obj.BET_OUTCOME === "Bet Won"){
            win_bet_counter += 1;
        }
        if(obj.BET_OUTCOME === "Bet Lost"){
            lost_bet_counter += 1;
        }
    })
    
    
    return (
        <div style={{display: "block", margin: 5, padding: 5}}>
            <h4>TOP WINNER'S WIN RATE DATA</h4>            
               
            <div>
                <strong>Player:&nbsp;</strong> {topWinner} &nbsp; have made total <strong></strong> {total_bet_counter} bets                      
            </div>            
        </div>
    );
};

export default GetWinRateTopWinner;