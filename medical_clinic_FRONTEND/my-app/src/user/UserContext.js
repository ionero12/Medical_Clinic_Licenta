import React, {createContext, useContext, useEffect, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser));
        } else {
            setUser({userType: '', userData: null});
        }
    }, []);

    useEffect(() => {
    }, [user]);


    return (<UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>);
};

export const useUser = () => useContext(UserContext);