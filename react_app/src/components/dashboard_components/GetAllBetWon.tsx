import React, {useMemo, useState} from 'react';
import useCSV from "../../hooks/useCSV";
import {getBetWon, sortRows} from "../../utils/assistFunctions";

const GetAllBetWon = () => {
    const {data}: any = useCSV();

    const [sortSettings, setSortSettings] =
        useState({order: 'desc', orderBy: 'ODDS'}); // asc desc default
    const sortedRows = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings])
    return (
        <div style={{display: "block", margin: 5, padding: 20}}>
            <h4>All Winners</h4>
            <h6>Sorted by <strong>ODDS</strong> desc</h6>
            <tr>
                {sortedRows.map((key: any, i: number) =>
                    <tr key={i}
                        style={{border: "1px dotted black"}}>
                        <td style={{border: "1px dotted black"}}>
                            {key.Player_no}
                        </td>
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
    );
};

export default GetAllBetWon;