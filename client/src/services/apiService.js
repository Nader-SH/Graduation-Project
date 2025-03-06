import API_BASE_URL from '../config/apiConfig';

// Generic API call function
const callApi = async (endpoint, method = 'GET', body = null, additionalHeaders = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...additionalHeaders
    };

    const options = {
      method,
      headers,
      credentials: 'include'
    };

    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }

    console.log(`Making ${method} request to: ${url}`);
    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || `API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API error (${endpoint}):`, error);
    throw error;
  }
};

// Auth services
export const authService = {
  login: (credentials) => callApi('/users/login', 'POST', credentials),
  register: (userData) => callApi('/users/register', 'POST', userData),
  logout: () => callApi('/users/logout', 'POST'),
  getProfile: () => callApi('/users/profile')
};

// Add other services as needed
export const userService = {
  getUsers: () => callApi('/users'),
  getUserById: (id) => callApi(`/users/${id}`),
  updateUser: (id, data) => callApi(`/users/${id}`, 'PUT', data)
};

export default {
  auth: authService,
  users: userService
}; 