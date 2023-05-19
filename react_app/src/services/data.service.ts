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

//AXIOS GET request for inbox messages
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
//Store data to localStorage
export const setDataToStore = (key: string, data: any) => {
    if (localStorage.getItem(key) === null) {
        let storedData = JSON.stringify(data)
        localStorage.setItem(key, storedData);
    }
};

//This function will help get item from Local Storage
export const getStoredData = (key: string): any => {
    let storedData = localStorage.getItem(key) || JSON.stringify([])
    if (storedData) {
        return JSON.parse(storedData);
    }
};

// Helps to store only headers for Local Storage
export const setHeadersToStore = (key: string, data: any) => {
    if (localStorage.getItem(key) === null) {
        let storedData = JSON.stringify(data)
        localStorage.setItem(key, storedData);
    }
};

//Extract headers from local storage
export const getStoredHeaders = (key: string) => {
    const storedHeaders = localStorage.getItem(key);
    if (storedHeaders) return JSON.parse(storedHeaders);
    return null;
};

//Removing items from local Storage, can accept item: string as prop or be without any props
export const clearStorage = (item?: string | null) => {
    localStorage.removeItem('csv');
    localStorage.removeItem('headers');
    if(typeof item === 'string'){
        localStorage.removeItem(item);
    }
}

//Clear whole local storage
export const clearLocStorage = () => localStorage.clear();
