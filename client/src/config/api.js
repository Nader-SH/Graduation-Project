const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://graduation-project-1-3tvj.onrender.com/api';

export const apiConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    credentials: 'include'
};

export default API_BASE_URL;

// Example API call function
export const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need
            },
        });
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Example POST request
export const postData = async (endpoint, data) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need
            },
            body: JSON.stringify(data),
        });
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};