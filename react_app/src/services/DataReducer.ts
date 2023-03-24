import {ICSVdata} from "../models/ICSVdata";

export const initialState = {
    csvData: [],
};
export const DataReducer = (state: Array<ICSVdata>, action: any) => {
    switch (action.type){
        case "ADD_DATA": {
            return {
                state,
            };
        }
    }
};