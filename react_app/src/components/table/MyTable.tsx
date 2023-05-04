import React, {FC, useMemo, useState} from 'react';
import IPlayer from "../../models/IPlayer";
import {filterRows, getPageCount, paginateTable, reformatColumnTitles, sortRows,} from "../../utils/assistFunctions";
import Pagination from "./Pagination";
import MySearch from "../UI/search/MySearch";
import MyButton from "../UI/buttons/MyButton";
import styles from '../../styles/Mytable.module.css';
import MyDropDown from "../UI/select/MyDropDown";
import {ICSVdata} from "../../models/ICSVdata";


type Props = {
    columns: Array<string>,
    rows: Array<ICSVdata>
}

const MyTable: FC<Props> = ({columns, rows}) => {

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
                        onChange={setRowsPerPage}
                    />

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
                                <th 
                                    key={index} 
                                    className={styles.sortButton}
                                    onClick={() => handleSort(column)}
                                >{sortButton(column)}
                                </th>
                            )
                        })}
                    </tr>
                    <tr>
                        {columns.map((column, index: number) => {
                            return (
                                <th 
                                    key={`${column}-search`} 
                                    style={{color: "black"}}>
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
                            <td key={crypto.randomUUID()}>{row.Player_no}</td>
                            <td key={crypto.randomUUID()}>{row.PLAYER_BET_NUMBER}</td>
                            <td
                                key={crypto.randomUUID()}
                                className={styles.tooltip}
                                abbr={`${row.BET_PLACED_DATE}`}>{row.BET_PLACED_DATE}</td>
                            <td
                                key={crypto.randomUUID()}
                                abbr={`${row.OVER_1000_SEK}`}
                                className={styles.tooltip}
                            >{row.OVER_1000_SEK}</td>
                            <td
                                key={crypto.randomUUID()}
                                abbr={`${row.EVENT_NAME}`}
                                className={styles.tooltip}
                            >{row.EVENT_NAME}</td>
                            <td
                                key={crypto.randomUUID()}
                                abbr={`${row.LEAGUE}`}
                                className={styles.tooltip}
                            >{row.LEAGUE}</td>
                            <td
                                key={crypto.randomUUID()}
                                abbr={`${row.BET_OFFER_TYPE}`}
                                className={styles.tooltip}
                            >{row.BET_OFFER_TYPE}</td>
                            <td
                                key={crypto.randomUUID()}
                                abbr={`${row.CRITERIA_NAME}`}
                                className={styles.tooltip}
                            >{row.CRITERIA_NAME}</td>
                            <td
                                key={crypto.randomUUID()}>{row.IS_LIVE}</td>
                            <td
                                key={crypto.randomUUID()}
                                abbr={`${row.BET_LABEL}`}
                                className={styles.tooltip}
                            >{row.BET_LABEL}</td>
                            <td
                                key={crypto.randomUUID()}>{row.ODDS}</td>
                            <td
                                key={crypto.randomUUID()}
                                abbr={`${row.BET_OUTCOME}`}
                                className={styles.tooltip}
                            >{row.BET_OUTCOME}</td>
                        </tr>
                    )}
                    </tbody>
                </table>
                {!calculatedRows.length &&
                    <h1 style={{textAlign: "center"}}>NO DATA FOUND!</h1>}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePagination={handlePages}/>
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