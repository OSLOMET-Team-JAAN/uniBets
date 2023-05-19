import axios from "../common/axiosAPI";
import {ICSVdata} from "../models/ICSVdata";

const TABLE_URL = "/Bets"

// Saving data to database
export const upload = (data: Array<ICSVdata>) => {
    const userStr = localStorage.getItem('user');
    let user = null;
    if (userStr) {
        user = JSON.parse(userStr);
    }
    return axios.post(`${TABLE_URL}/saveTable`, data, {
        headers: {
            Authorization: `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
        },
    });
};

// Fetching data from database
export const getAll = () => {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
    return axios.get(`${TABLE_URL}/getAll`, {
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Authorization': `Bearer ${user?.token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*'
        }
    });
};

// REQUESTS FOR FEEDBACK SENDING AND RECEIVING
export const submit = (email: string, subject: string, message: string) => {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
    return axios.post('/message/submit', {email, subject, message},
        {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
            }
        }
    );
};

export const getInbox = () => {
    const userStr = localStorage.getItem("user");
    let user = null;
    if (userStr)
        user = JSON.parse(userStr);
    return axios.get('/message/get_inbox', {
            headers: {
                // Overwrite Axios's automatically set Content-Type
                'Authorization': `Bearer ${user?.token}`,
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        },
    );
};

//THIS IS TO MAKE PERSIST DATA
export const setDataToStore = (key: string, data: any) => {
    if (localStorage.getItem(key) === null) {
        let storedData = JSON.stringify(data)
        localStorage.setItem(key, storedData);
    }
};

export const getStoredData = (key: string): any => {
    let storedData = localStorage.getItem(key) || JSON.stringify([])
    if (storedData) {
        return JSON.parse(storedData);
    }
};

export const setHeadersToStore = (key: string, data: any) => {
    if (localStorage.getItem(key) === null) {
        let storedData = JSON.stringify(data)
        localStorage.setItem(key, storedData);
    }
};

export const getStoredHeaders = (key: string) => {
    const storedHeaders = localStorage.getItem(key);
    if (storedHeaders) return JSON.parse(storedHeaders);
    return null;
};

export const ClearContext = () => {
    localStorage.removeItem('csv');
    localStorage.removeItem('headers');
}

export const clearLocStorage = () => localStorage.clear();
