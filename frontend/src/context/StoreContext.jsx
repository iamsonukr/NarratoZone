import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (prop) => {
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // this function is to stay logged in even after reloading the page
    useEffect(() => {
        const loadToken = async () => {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
            }
        };

        const loadName = async () => {
            if (localStorage.getItem("name")) {
                setName(localStorage.getItem("name"));
            }
        };

        const loadEmail = async () => {
            if (localStorage.getItem("userEmail")) {
                setUserEmail(localStorage.getItem("userEmail")); // Fixed here
            }
        };

        loadName();
        loadEmail();
        loadToken();
    }, []);

    const contextValue = {
        token,
        setToken,
        setName,
        name,
        userEmail,
        setUserEmail,
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {prop.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
