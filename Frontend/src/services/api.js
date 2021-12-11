import axios from 'axios';

// const token = localStorage.getItem('Token');

export const api = axios.create({
    baseURL: "http://localhost/Buscafe/Backend",
});

// if(token){
//     api.defaults.headers['Authorization'] = `Bearer ${token}`;
// }