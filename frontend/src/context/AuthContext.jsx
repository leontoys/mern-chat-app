import { createContext, useContext, useState } from "react";

//step1 - create context
const AuthContext = createContext()

//step5 - create use context hook?
export const useAuthContext = () => {
    return useContext(AuthContext)//this will give access to setAuthUser state
}

//step2 - creae context provider 
export const AuthContextProvider = (props) => {
//step4 - create state that needs to be added to the provider and update this in the value
    const[authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chatuser")) || null)

//step 3 - context provider
    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    )
//step 6 - wrap App around this provider in index.js
}

export default AuthContext