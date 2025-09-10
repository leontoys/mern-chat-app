import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

//to use context in other components
export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5000", {
                query: {
                    userId: authUser._id //pass the authorised user's id to the backend
                    //with query parameter userId
                }
            })
            setSocket(socket)

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users)
            })

            return ()=>socket.close()
        } else {
            if (socket) {
                socket.close()
                setSocket(null)                
            }

        }
    },[authUser])

    return(
    <SocketContext.Provider value={{ socket, onlineUsers }}>
        {children}
    </SocketContext.Provider>)
};