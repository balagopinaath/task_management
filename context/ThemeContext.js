import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        colors: {
            text: isDarkMode ? '#f3f1f9' : '#0e0c19',
            background: isDarkMode ? '#0e0c19' : '#f3f1f9',
            primary: '#6d59b3',
            secondary: '#d6a5a9',
            accent: '#c1a479',
        },
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};