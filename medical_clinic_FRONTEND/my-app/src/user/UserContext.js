import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

// Define UserProvider
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user data from local storage when the application is loaded
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser));
        } else {
            // Set a default user value if no user data is found
            setUser({ userType: '', userData: null });
        }
    }, []);

    useEffect(() => {
    }, [user]);


    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

// Define useUser hook
export const useUser = () => useContext(UserContext);