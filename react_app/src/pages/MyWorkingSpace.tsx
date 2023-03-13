import React from 'react';
import useCSV from "../hooks/useCSV";
import IPlayer from "../models/IPlayer";

const MyWorkingSpace = () => {
    const {data}: any = useCSV();
    const array: Array<string> = [];
    data.map((key: IPlayer, i: number) => array.push(key.BET_OUTCOME))
    const bet_array: Array<string> = [];
    // array.map((key, i: number) => {
    //         if (key[i] === 'Bet Won') {
    //             bet_array.push(key)
    //         }
    //     }
    // )


    return (
        <div>
            <h3>HERE IS MY WORK SPACE</h3>
            <div>
                <tr>
                    {data.map((key: any, i: number) =>
                        <tr key={i} style={{border: "1px dotted black"}}>
                            <td style={{border: "1px dotted black"}}>{i}</td>
                            <td style={{border: "1px dotted black"}} key={i + key.ODDS}>
                                {key.ODDS}
                            </td>
                            <td key={i + "a"} style={{border: "1px dotted black"}}>
                                {key.BET_OUTCOME}
                            </td>
                        </tr>
                    )}
                </tr>
            </div>

        </div>
    );
};

export default MyWorkingSpace;