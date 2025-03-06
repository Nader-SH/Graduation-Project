// API configuration
const isProd = process.env.NODE_ENV === 'production';

// Set the base URL based on environment
const API_BASE_URL = isProd 
  ? 'https://graduation-project-1-3tvj.onrender.com/api'
  : 'http://localhost:8000/api';

export default API_BASE_URL; 