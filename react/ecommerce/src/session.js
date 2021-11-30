import {createContext} from "react";

export const SessionContext = createContext(null);

export const SessionContextProvider = ({children}) => {
    const isUserStaff = () => {
        //Consulto si el usuario es staff
        const data = parseInt(localStorage.getItem("user_is_staff")) || 0
        return (data > 0)
    }
    const isLoggedIn = () => {
        // Si esta loggeado devuelvo el token
        const data = localStorage.getItem("token") || ""
        return (data !== "")
    }
    const Logout = () => {
        // elimino el token y si es staff
        localStorage.removeItem("token")
        localStorage.removeItem("user_is_staff")
        localStorage.removeItem("user_id")
    }
    const values = {isLoggedIn, isUserStaff, Logout}
    return (
        <SessionContext.Provider value={values}>
            {children}
        </SessionContext.Provider>
    )
}