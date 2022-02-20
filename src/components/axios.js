import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:5001/online-veggies-2bac6/us-central1/api'
});

export default instance;