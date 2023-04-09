/*
    This function will return number of pages from given table's rows
*/

import {ICSVdata} from "../models/ICSVdata";

export const getPageCount = (totalRows: number, limit: number) => {
    return Math.ceil(totalRows / limit)
}

export const getHeaders = (response: any) => {
    const head = JSON.parse(JSON.stringify(response))
    return Object.keys(head[0])
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
            let value: { [key: string | number]: any } = row[key]
            const searchQuery = filters[key]

            if (isString(value)) {
                return toLower(value).includes(toLower(searchQuery))
            }

            if (isNumber(value)) {
                value = convertType(value)
                return value === searchQuery
            }
            return false
        })
    })
}

export function sortRows(rows: Array<ICSVdata>, sort: { order: string; orderBy: string }) {
    return rows.sort((a, b) => {
        const {order, orderBy} = sort
        //-- Checking for undefined and null
        //--We used a type assertion to indicate to TypeScript that the string variable is a
        // union type containing only the keys of the object. Now TypeScript lets us access the specific property
        // without throwing the error. (as keyof typeof a)
        if (isNil(a[orderBy as keyof typeof a])) return 1
        if (isNil(b[orderBy as keyof typeof b])) return -1

        //-- For localeCompare usage we need string data
        const value1 = convertType(a[orderBy as keyof typeof a])
        const value2 = convertType(b[orderBy as keyof typeof b])

        if (order === 'asc') {
            return value1.localeCompare(value2, undefined, {numeric: true})
        } else {
            return value2.localeCompare(value1, undefined, {numeric: true})
        }
    })
}

export const reformatColumnTitles = (columnTitle: string) => {
    if (isString(columnTitle))
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
export function getBetWon(data: any): ICSVdata[] {
    return data.filter((rows: any) =>
        rows.BET_OUTCOME === 'Bet Won'
    )
}

// Get Top data
export function getTop(data: any, top: number | string): ICSVdata[] {
    return data.slice(0, top).map((item: any) =>
        item
    )
}

// GET CUSTOM PLAYER's DATA
export function getPlayerData(data: ICSVdata[], Player: number | string){
    let total_bet_counter = 0;
    let win_bet_counter = 0;
    let lost_bet_counter = 0;
    const getTopWinnerData = data.filter((obj: any) => {
        if (obj.Player_no === Player) {
            total_bet_counter += 1
            return obj.Player_no
        }
    })
    getTopWinnerData.filter((obj: any) => {
        if (obj.BET_OUTCOME === "Bet Won") {
            win_bet_counter += 1;
        }
        if (obj.BET_OUTCOME === "Bet Lost") {
            lost_bet_counter += 1;
        }
    })
    
    return {
        Player: Player,
        Bets_Total: total_bet_counter,
        Bets_Won: win_bet_counter,
        Bets_lost: lost_bet_counter,
        Win_Rate: Math.round((win_bet_counter / total_bet_counter) * 100),
        Lost_Rate: Math.round((lost_bet_counter / total_bet_counter) * 100),
    }
}

export const getResultsTotal = (data: ICSVdata[], Player: number | string) => {
    const playerData: any = getPlayerData(data, Player);
    return {
        Player: Player,
        Bets_Total: playerData.Bets_Total,
        Bets_Won: playerData.Bets_Won,
        Bets_lost: playerData.Bets_lost,
        Win_Rate: Math.round((playerData.Bets_Won / playerData.Bets_Total) * 100),
        Lost_Rate: Math.round((playerData.Bets_lost / playerData.Bets_Total) * 100),
    }
}

export const getResults = (data: ICSVdata[], Player: number | string) => {
    const playerData: any = getPlayerData(data, Player);
    return [
        {name: 'Total bets', value: playerData.Bets_Total},
        {name: 'Bets Won', value: playerData.Bets_Won},
        {name: 'Bets Lost', value: playerData.Bets_lost},
    ]
}

export const getWinRate = (data: ICSVdata[], Player: number | string) => {
    const playerData: any = getPlayerData(data, Player);
    return [
        {name: 'Win Rate', value: Math.round((playerData.Bets_Won / playerData.Bets_Total) * 100)},
        {name: 'Lost Rate', value: Math.round((playerData.Bets_lost / playerData.Bets_Total) * 100)},
    ]
}


// https://bobbyhadz.com/blog/typescript-element-implicitly-has-any-type-expression

