import { useState, useEffect, createContext } from "react";
import {ethers} from "ethers"

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const name = "Aman"
    return(
        <AppContext.Provider value={{name}}>
            {children}
        </AppContext.Provider>
    )
}