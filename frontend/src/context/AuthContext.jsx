import { createContext, useState } from "react";

const AuthContext = createContext()

export const AuthContextProvider = (props) => {

    const[authUser,setAuthUser] = useState(JSON.parse(localStorage.getItem("chatuser")) || null)

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext