import { apiConfig } from '../config/api';

export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${apiConfig.baseURL}/users/login`, {
            method: 'POST',
            headers: apiConfig.headers,
            credentials: apiConfig.credentials,
            body: JSON.stringify(credentials)
        });
        return await response.json();
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${apiConfig.baseURL}/users/register`, {
            method: 'POST',
            headers: apiConfig.headers,
            credentials: apiConfig.credentials,
            body: JSON.stringify(userData)
        });
        return await response.json();
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}; 