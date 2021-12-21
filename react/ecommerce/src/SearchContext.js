import React, {createContext, useContext, useState} from "react";

export const SearchContext = createContext();

export const SearchContextProvider = ({children}) => {
    const [search, setSearch] = useState("")
    const values = {search, setSearch}

    return (
        <SearchContext.Provider value={values}>
            {children}
        </SearchContext.Provider>
    )
};

export const useSearchContext = () => useContext(SearchContext)