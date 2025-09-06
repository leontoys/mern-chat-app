import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useConversation from "../zustand/useConversation.js";

const useGetMessages = () => {

    const [loading, setLoading] = useState(false)
	const { messages, setMessages, selectedConversation } = useConversation();

    console.log("reach use get messages",selectedConversation)
    
    useEffect(() => {
       
        const getMessages = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/${selectedConversation?._id}`)
            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }

            setMessages(data)

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    
        }

        //call get messages
        if(selectedConversation?._id) getMessages()


    },[selectedConversation?._id,setMessages])//this should run when the selected conversation changes

  return {messages,loading}
}

export default useGetMessages