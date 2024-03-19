// UserContext.js
import React, {createContext, useContext, useState} from 'react';

// Create a context for the user's information
const UserContext = createContext();

// Create a provider component for the user's information
export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (<UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>);
};

// Create a hook to use the user's information
export const useUser = () => useContext(UserContext);

export default UserContext;
