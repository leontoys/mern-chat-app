import { createContext } from "react";

const AuthContext = createContext()

export const AuthContextProvider = (props) => {
    return (
        <AuthContext.Provider value={}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext