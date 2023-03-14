/*
    This function will return number of pages from given table's rows
*/

import {ICSVdata} from "../models/ICSVdata";

export const getPageCount = (totalRows: number, limit: number) => {
    return Math.ceil(totalRows / limit)
}

/*
    This functions will assist with filters-----------------------

*/
export function isEmpty(obj = {}) {
    return Object.keys(obj).length === 0
}

export function isString(value: any) {
    return typeof value === 'string' || value instanceof String
}

export function isNumber(value: any) {
    return typeof value == 'number' && !isNaN(value)
}

export function isNil(value: any) {
    return typeof value === 'undefined' || value === null
}

export function isDateNumber(value: any) {
    if (!isNumber(value)) return false
    return value
}

// export function reformatDate(value: string){
//     return new Date(value).toLocaleDateString('sv');
// }

export function convertDateToNumber(value: string) {
    let date = new Date(value)
    return date.getTime()
}

export function toLower(value: any) {
    if (isString(value)) {
        return value.toLowerCase()
    }
    return value
}

export function convertType(value: any) {
    if (isNumber(value)) {
        return value.toString()
    }

    if (isDateNumber(value)) {
        return convertDateToNumber(value)
    }

    return value
}

export function filterRows(rows: Array<ICSVdata>, filters: any) {
    if (isEmpty(filters)) return rows

    return rows.filter((row: any) => {
        return Object.keys(filters).every((key) => {
            const value: {[key: string]: any} = row[key]
            const searchQuery = filters[key]

            if (isString(value)) {
                return toLower(value).includes(toLower(searchQuery))
            }

            if (isNumber(value)) {
                return value === searchQuery
            }
            return false
        })
    })
}

export function sortRows(rows: Array<ICSVdata>, sort: { order: string; orderBy: string }) {
    return rows.sort((a, b) => {
        const { order, orderBy } = sort
        //-- Checking for undefined and null
        //--We used a type assertion to indicate to TypeScript that the string variable is a
        // union type containing only the keys of the object. Now TypeScript lets us access the specific property
        // without throwing the error. (as keyof typeof a)
        if (isNil(a[orderBy as keyof typeof a])) return 1
        if (isNil(b[orderBy as keyof typeof a])) return -1

        //-- For localeCompare usage we need string data
        const value1 = convertType(a[orderBy as keyof typeof a])
        const value2 = convertType(b[orderBy as keyof typeof a])

        if (order === 'asc') {
            return value1.localeCompare(value2, undefined, { numeric: true })
        } else {
            return value2.localeCompare(value1, undefined, { numeric: true })
        }
    })
}

export const reformatColumnTitles = (columnTitle: string) => {
    if(isString(columnTitle))
        return columnTitle
            .toLowerCase()
            .replace(/_/g, ' ')
            .replace(/^\w/, c => c.toUpperCase());
}

export function paginateTable(sortedRows: any, currentPage: number, rowsPerPage: number) {
    return [...sortedRows].slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
}

//------ DASH BOARD FUNCTIONS -------------------
// Get only Won bets rows
export function getBetWon (data: any): ICSVdata[] {
    return data.filter((rows: any) =>
        rows.BET_OUTCOME === 'Bet Won'
    )
}

// Get Top data
export function getTop(data: any, top: number): ICSVdata[] {
    return data.slice(0, top).map((item: any) =>
        item
    )
}




// https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression

