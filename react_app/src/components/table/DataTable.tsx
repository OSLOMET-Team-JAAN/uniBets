import React, {FC, useMemo, useState} from 'react';
import {filterRows, getPageCount, paginateTable, sortRows,} from "../../utils/assistFunctions";
import { saveAs } from 'file-saver';
import Pagination from "./Pagination";
import MySearch from "../UI/search/MySearch";
import MyButton from "../UI/buttons/MyButton";
import styles from '../../styles/DataTable.module.css';
import MyDropDown from "../UI/select/MyDropDown";
import IContact from "../../models/IContact";


type Props = {
    columns: Array<string>,
    rows: Array<IContact>
}

const DataTable: FC<Props> = ({columns, rows}) => {

    //Holds current page
    const [currentPage, setCurrentPage] = useState(1);
    //State to hold filters
    const [filters, setFilters] = useState({});

    //Sorting settings
    const [sortSettings, setSortSettings] = useState({order: 'asc', orderBy: 'id'});
    //State to hold amount of table's rows per page
    const [rowsPerPage, setRowsPerPage] = useState(20);
    //---------------------------------------------------------------------

    const filteredRows = useMemo(() =>
        filterRows(rows, filters), [rows, filters])
    const sortedRows = useMemo(() =>
        sortRows(filteredRows, sortSettings), [filteredRows, sortSettings])
    
    //Pagination
    const calculatedRows =
        paginateTable(sortedRows, currentPage, rowsPerPage);
    const filteredRowsNumber = filteredRows.length;
    const totalPages = getPageCount(filteredRowsNumber, rowsPerPage);
    const handlePages = (page: number) => setCurrentPage(page)

    //Search handle in table
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

    //Sorting by columns
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

    //Setting states to their defaults
    const resetSortsAndFilters = () => {
        setSortSettings({order: 'asc', orderBy: 'BET_PLACED_DATE'});
        setCurrentPage(1);
        setFilters({});
        setRowsPerPage(20)
    }

    //Saving inbox data to CSV file
    const saveTableData = (tableData: IContact[]) => {
        const headerRow = Object.keys(tableData[0]).join(',');
        const csvData = [headerRow];
        tableData.forEach((row) => {
            const rowData = Object.values(row).join(',');
            csvData.push(rowData);
        });

        const csvBlob = new Blob([csvData.join('\n')], { type: 'text/csv;charset=utf-8' });
        saveAs(csvBlob, 'data_from_inbox.csv');
    };


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
                    <MyButton 
                        onClick={() => saveTableData(rows)}
                    >Export to CSV
                    </MyButton>

                </div>
                <table>
                    <colgroup>
                        <col style={{ width: "15%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "20%" }} />
                        <col style={{ width: "45%" }} />
                    </colgroup>
                    <thead>
                    <tr>
                        {columns.map((column: any, index: number) => {
                            return (
                                <th key={index}>
                                    {column}
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
                    {calculatedRows.map((row: IContact, index: number) =>
                        <tr key={index}>
                            <td 
                                key={crypto.randomUUID()}
                            >{row.Id}</td>
                            <td 
                                key={crypto.randomUUID()}
                                className={styles.tooltip}
                                abbr={`${row.Email}`}
                            >{row.Email}</td>
                            <td 
                                key={crypto.randomUUID()}
                                className={styles.tooltip}
                                abbr={`${row.Subject}`}
                            >{row.Subject}</td>
                            <td 
                                key={crypto.randomUUID()}
                                className={styles.tooltip}
                                style={{textAlign: "left"}}
                                abbr={`${row.message}`}
                            >{row.message}</td>          
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

export default DataTable;

// https://www.taniarascia.com/front-end-tables-sort-filter-paginate/
// https://www.youtube.com/watch?v=EaxC_kOG03E
// https://unicode-table.com/en/25B2/
// https://www.youtube.com/watch?v=BqVH9Z_6p38 - useEffect as fetching data
// https://developer.mozilla.org/en-US/docs/web/api/intersection_observer_api
// https://contactmentor.com/checkbox-list-react-js-example/