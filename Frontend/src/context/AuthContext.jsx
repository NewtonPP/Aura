import { createContext, useContext } from "react";
import { useState } from "react";

export const AuthContext = createContext();

export const useAuthContext = ()=>{
    return useContext(AuthContext);
}


export const AuthContextProvider =({children})=>{
    const [authUser, setAuthUser] = useState((localStorage.getItem("UserId"))||null);
    return <AuthContext.Provider value = {{authUser,setAuthUser}}>{children}</AuthContext.Provider>
}