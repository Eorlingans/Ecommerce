import { createContext } from "react";

export const SessionContext = createContext(null);

export const SessionContextProvider = ({children}) => {
    const isUserStaff = () => {
        const data = parseInt(localStorage.getItem("user_is_staff")) || 0
        return (data > 0)
    }
    const isLoggedIn = () => {
        const data = localStorage.getItem("token") || ""
        return (data !== "")
    }
    const Logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user_is_staff")
    }
    const values = { isLoggedIn, isUserStaff, Logout }
    return (
        <SessionContext.Provider value={values}>
            {children}
        </SessionContext.Provider>
    )
}