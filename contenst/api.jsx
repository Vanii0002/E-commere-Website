import React, { createContext } from 'react';

export const ApiContext = createContext();

function ApiProvider({ children }) {
    const serverurl = "http://localhost:8000/";
    const value = { serverurl };
    return (
        <ApiContext.Provider value={value}>
            {children}
        </ApiContext.Provider>
    );
}

export default ApiProvider;