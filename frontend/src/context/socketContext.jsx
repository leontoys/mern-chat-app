import { createContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext()

export const SocketContextProvider = (props) => {

    const { authUser } = useAuthContext()
    const [socket, setSocket] = useState(null)
    const [onlineUsers,setOnlineUsers] = useState([])

    useEffect(() => {        
        if (authUser) {
            //if there is an authenticated user create socket
            const socket = io('http://localhost:5000') //backend url 
            setSocket(socket)//update state
            return ()=>socket.close() //clean up function for unmounting
        } else {
            if (socket) { //close existing socket connection if no authenticated user
                socket.close()
                setSocket(null)
            }
        }

    },[])

    return (
        <SocketContextProvider value={{socket,onlineUsers}}>
            {props.children}
        </SocketContextProvider>
    )
}