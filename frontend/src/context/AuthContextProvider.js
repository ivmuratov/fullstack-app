import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { getAuthRoles } from "../util/authUtil";

const authContext = createContext();

const AuthContextProvider = ({ children }) => {

    const [auth, setAuth] = useState(false);

    useEffect(() => {
        getAuthRoles() == null ? setAuth(false) : setAuth(true);
    }, []);   

    return (
        <authContext.Provider value={{ auth, setAuth }}>
            {children}
        </authContext.Provider>
    );
}

export const useAuthContext = () => {
    return useContext(authContext);
}

export default AuthContextProvider;