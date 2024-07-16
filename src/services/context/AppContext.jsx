import { createContext, useEffect, useState } from 'react';
import { STORAGE_KEYS, getValue } from '../Storage';
import { toast } from 'react-toastify';
import { doGET } from '../../utils/HttpUtil';
import { ENDPOINTS } from '../api/constants';

export const AppContext = createContext("");

export const AppProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAppReady, setIsAppReady] = useState(false)

    const success = (message) => toast.success(message);
    const error = (message) => toast.error(message);

    const getCurrentUser = async () => {
        try {
            const response = await doGET(ENDPOINTS?.profile);
            setUserData(response?.data);
            if (response) {
                setIsLoggedIn(true)
            }
        } catch (error) {
            error('Failed to fetch user data');
        } finally {
            setIsAppReady(true);
        }
    };

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        success("Logout Successfully");
    };

    useEffect(() => {
        const token = getValue(STORAGE_KEYS.TOKEN);
        if (token) {
            setIsLoggedIn(true);
            getCurrentUser();
        } else {
            setIsAppReady(true)
        }
    }, []);

    return (
        <AppContext.Provider
            value={{
                userData,
                setUserData,
                success,
                error,
                isLoggedIn,
                setIsLoggedIn,
                logout,
                isAppReady,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};