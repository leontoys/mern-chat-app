import { useEffect } from "react";
import { useSocketContext } from "../context/socketContext";
import useConversation from "../zustand/useConversation.js";
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()
    
    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            console.log("messages", messages)
            const sound = new Audio(notificationSound)
            sound.play()
            newMessage.shouldShake = true
            setMessages([...messages,newMessage])
        })

        //clean up function - so that we listen it only once
        return ()=>socket?.off("newMessage")
    },[socket,setMessages,messages])
}

export default useListenMessages