import axios from "../common/axiosAPI";
import IPlayer from "../models/IPlayer";


export const upload = (data: Array<IPlayer>) => {
    return axios.post('/saveTable', {data},
    );
};

export const getAll = () => {
    return axios.get('/getAll');
};