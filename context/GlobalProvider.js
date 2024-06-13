import React, { createContext, useContext, useEffect, useState } from "react";
import { ToastAndroid } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        SecureStore.getItemAsync('userData').then(userData => {
            if (userData) {
                setUser(JSON.parse(userData));
                setIsLogged(true);
            }
            setLoading(false);
        }).catch(error => {
            console.error('Error retrieving user data:', error);
            ToastAndroid.show(error, ToastAndroid.LONG)
            setLoading(false);
        });
    }, []);

    return (
        <GlobalContext.Provider value={{ isLogged, setIsLogged, user, setUser, loading }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;