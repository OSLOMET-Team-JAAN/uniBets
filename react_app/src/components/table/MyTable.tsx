import React, {useMemo, useState} from 'react';
import myKey from "../../utils/keyGenerator";
import IPlayer from "../../models/IPlayer";
import {filterRows, getPageCount, paginateTable, reformatColumnTitles, sortRows,} from "../../utils/assistFunctions";
import Pagination from "./Pagination";
import MySearch from "../UI/search/MySearch";
import MyButton from "../UI/buttons/MyButton";
import styles from '../../styles/Mytable.module.css';
import MyDropDown from "../UI/select/MyDropDown";
import {
    Bar,
    BarChart, Brush,
    CartesianGrid,
    Legend, ReferenceLine,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import {ICSVdata} from "../../models/ICSVdata";


type Props = {
    columns: Array<string>,
    rows: Array<ICSVdata>
}

const MyTable = ({columns, rows}: Props) => {
    console.log(rows)

    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({});

    const [sortSettings, setSortSettings] = useState({order: 'asc', orderBy: 'BET_PLACED_DATE'}); // asc desc default
    const [rowsPerPage, setRowsPerPage] = useState(20);
    //---------------------------------------------------------------------

    const filteredRows = useMemo(() =>
        filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() =>
        sortRows(filteredRows, sortSettings), [filteredRows, sortSettings])
    const calculatedRows =
        paginateTable(sortedRows, currentPage, rowsPerPage);

    const filteredRowsNumber = filteredRows.length;
    const totalPages = getPageCount(filteredRowsNumber, rowsPerPage);
    const handlePages = (page: number) => setCurrentPage(page)

    const handleSearch = (value: string, accessor: string) => {
        setCurrentPage(1)

        if (value) {
            setFilters((existingFilters) => ({
                ...existingFilters,
                [accessor]: value,
            }))
        } else {
            setFilters((existingFilters) => {
                const updatedFilters: { [accessor: string]: any } = {...existingFilters}
                delete updatedFilters[accessor]

                return updatedFilters
            })
        }
    }

    const handleSort = (accessor: string) => {
        setCurrentPage(1)
        setSortSettings((existingSort) => ({
            order:
                existingSort.order === 'asc'
                &&
                existingSort.orderBy === accessor ? 'desc' : 'asc',
            orderBy: accessor,
        }))
    }

    function sortButton(searchQuery: string) {
        if (searchQuery === sortSettings.orderBy) {
            if (sortSettings.order === 'asc') {
                return (<span>⮝</span>)
            }
            return (<span>⮟</span>)
        } else {
            return (<span>⇳</span>)
        }
    }

    const resetSortsAndFilters = () => {
        setSortSettings({order: 'asc', orderBy: 'BET_PLACED_DATE'});
        setCurrentPage(1);
        setFilters({});
        setRowsPerPage(20)
    }


    return (
        <>
            <div className={styles.TableContainer}>
                <div style={{display: "flex"}}>
                    <MyButton
                        onClick={resetSortsAndFilters}
                    >
                        Clear Filters
                    </MyButton>

                    <MyDropDown
                        defaultValue={`Rows..`}
                        options={[
                            {value: 10, label: '10'},
                            {value: 15, label: '15'},
                            {value: 20, label: '20'},
                            {value: 25, label: '25'},
                            {value: 30, label: '30'},
                            {value: 50, label: '50'},
                            {value: 100, label: '100'},
                        ]}
                        value={rowsPerPage}
                        onChange={setRowsPerPage}/>

                </div>
                <table>
                    <thead>
                    <tr>
                        {columns.map((column: any, index: number) => {
                            return (
                                <th key={index}>
                                    <>{reformatColumnTitles(column)}</>
                                    {" "}
                                </th>
                            )
                        })}
                    </tr>
                    <tr>
                        {columns.map((column: any, index: number) => {
                            return (
                                <th key={index} className={styles.sortButton}
                                    onClick={() => handleSort(column)}
                                >                                        {sortButton(column)}
                                </th>
                            )
                        })}
                    </tr>
                    <tr>
                        {columns.map((column, index: number) => {
                            return (
                                <th key={`${column}-search`}>
                                    <MySearch
                                        key={`${index}-search`}
                                        value={column}
                                        filters={filters}
                                        handleSearch={handleSearch}
                                        placeholder={column}
                                    />
                                </th>
                            )
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {calculatedRows.map((row: IPlayer, index: number) =>
                        <tr key={index}>
                            <td key={"a" + myKey}>{row.Player_no}</td>
                            <td key={"b" + myKey}>{row.PLAYER_BET_NUMBER}</td>
                            <td
                                key={"c" + myKey}
                                className={styles.tooltip}
                                abbr={`${row.BET_PLACED_DATE}`}>{row.BET_PLACED_DATE}</td>
                            <td
                                key={"d" + myKey}
                                abbr={`${row.OVER_1000_SEK}`}
                                className={styles.tooltip}
                            >{row.OVER_1000_SEK}</td>
                            <td
                                key={"e" + myKey}
                                abbr={`${row.EVENT_NAME}`}
                                className={styles.tooltip}
                            >{row.EVENT_NAME}</td>
                            <td
                                key={"f" + myKey}
                                abbr={`${row.LEAGUE}`}
                                className={styles.tooltip}
                            >{row.LEAGUE}</td>
                            <td
                                key={"g" + myKey}
                                abbr={`${row.BET_OFFER_TYPE}`}
                                className={styles.tooltip}
                            >{row.BET_OFFER_TYPE}</td>
                            <td
                                key={"i" + myKey}
                                abbr={`${row.CRITERIA_NAME}`}
                                className={styles.tooltip}
                            >{row.CRITERIA_NAME}</td>
                            <td
                                key={"j" + myKey}>{row.IS_LIVE}</td>
                            <td
                                key={"k" + myKey}
                                abbr={`${row.BET_LABEL}`}
                                className={styles.tooltip}
                            >{row.BET_LABEL}</td>
                            <td
                                key={"l" + myKey}>{row.ODDS}</td>
                            <td
                                key={"m" + myKey}
                                abbr={`${row.BET_OUTCOME}`}
                                className={styles.tooltip}
                            >{row.BET_OUTCOME}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {/*<div ref={lastElement.current} style={{height: 20, background: 'red'}}></div>*/}
                {!calculatedRows.length &&
                    <h1 style={{textAlign: "center"}}>NO DATA FOUND!</h1>}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePagination={handlePages}/>
            </div>
            <div>
                <div>
                    <h4>Bar chart testing</h4>
                    <ResponsiveContainer height={200}>
                        <BarChart
                            data={calculatedRows}
                            margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="BET_OUTCOME" stackId="a" fill="#8884d8"/>
                            <Bar dataKey="Player_no" stackId="a" fill="#82ca9d"/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <h4>Simple Scatter chart testing</h4>
                    <ResponsiveContainer height={400}>
                        <ScatterChart
                            margin={{
                                top: 20,
                                right: 20,
                                bottom: 20,
                                left: 20,
                            }}
                        >
                            <CartesianGrid/>
                            <XAxis type="category" dataKey="BET_PLACED_DATE" name="BET_PLACED_DATE"/>
                            <YAxis type="number" dataKey="ODDS" name="ODDS"/>
                            <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                            <Scatter name="ODDS" data={rows} fill="#8884d8"/>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <div>
                    <h4>Simple Scatter chart testing</h4>

                </div>
            </div>
        </>
    )
}

export default MyTable;

// https://www.taniarascia.com/front-end-tables-sort-filter-paginate/
// https://www.youtube.com/watch?v=EaxC_kOG03E
// https://unicode-table.com/en/25B2/
// https://www.youtube.com/watch?v=BqVH9Z_6p38 - useEffect as fetching data
// https://developer.mozilla.org/en-US/docs/web/api/intersection_observer_api
// https://contactmentor.com/checkbox-list-react-js-example/