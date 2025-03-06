import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Initialize user state

  useEffect(() => {
    // Check if the user is authenticated (e.g., check local storage or a cookie)
    const token = localStorage.getItem('token'); // Example: using local storage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    // Perform login logic (e.g., API call)
    // On success, set the token in local storage
    localStorage.setItem('token', 'your_token_here'); // Replace with actual token
    setIsAuthenticated(true);
    setUser(userData); // Ensure userData contains the user ID
  };

  const logout = () => {
    // Perform logout logic
    localStorage.removeItem('token'); // Remove token from local storage
    setIsAuthenticated(false);
    setUser(null); // Clear user data on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 