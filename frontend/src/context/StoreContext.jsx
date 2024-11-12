import { createContext, useContext,useState,useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null)





const StoreContextProvider = (prop) => {
    const [token, setToken] = useState('')
    const [name,setName]=useState('')
    const [username,setUsername]=useState('')
    // this function is to stay logged in even after reloading the page

    useEffect(() => {
        const loadToken = async () => {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            }
        }
        loadToken()
    }, [])

    const contextValue = {
        token,
        setToken,
        setName,
        name,
        username,
        setUsername,

    }
    return (
        <StoreContext.Provider value={contextValue}>
            {prop.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider