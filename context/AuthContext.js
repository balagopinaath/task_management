import React, { createContext, useContext, useState } from 'react';

// Create a context
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Login function
    const login = () => {
        // Perform login logic here, e.g., validate credentials, set tokens, etc.
        setIsLoggedIn(true);
    };

    // Logout function
    const logout = () => {
        // Perform logout logic here, e.g., clear tokens, reset state, etc.
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
