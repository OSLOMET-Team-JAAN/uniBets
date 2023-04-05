import React, {useMemo, useState} from 'react';
import {getBetWon, sortRows} from "../../utils/assistFunctions";
import useCSV from "../../hooks/useCSV";


//This component will check for date-time ranges
//It can help us to suppose if there any  bot was used or not
const GetDatesRages = () => {
    const {data}: any = useCSV();

    const [sortSettings] =
        useState({order: 'desc', orderBy: 'BET_PLACED_DATE'}); // asc desc default
    const sortedData = useMemo(() =>
        sortRows(getBetWon(data), sortSettings), [data, sortSettings]);


    // Extracting seconds into array for further finding of time range
    const array: Array<number> = [];

    sortedData.map((item: any) => {
        //console.log(item.BET_PLACED_DATE)
        let timestamp = Date.parse(item.BET_PLACED_DATE);
        if (!isNaN(timestamp)) {
            let d = new Date(timestamp);
            array.push(d.getSeconds())
        }

    })
    // console.log(array)


    return (
        <div>

        </div>
    );
};

export default GetDatesRages;