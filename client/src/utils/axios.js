import axios from 'axios';
import { apiConfig } from '../config/api';

const axiosInstance = axios.create({
    baseURL: apiConfig.baseURL,
    headers: apiConfig.headers,
    withCredentials: true
});

export default axiosInstance; 