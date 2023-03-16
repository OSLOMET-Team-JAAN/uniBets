import axios from "../common/axiosAPI";
import {ICSVdata} from "../models/ICSVdata";

const TABLE_URL = "/Bets"
export const upload = (data: any) => {    
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
    return axios.post(TABLE_URL + '/saveTable', data, {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
    );
};

export const getAll = () => {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
    return axios.get(TABLE_URL + '/getAll', {
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });
};