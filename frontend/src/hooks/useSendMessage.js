import React, { useState } from 'react'
import toast from 'react-hot-toast'
import useConversation from "../zustand/useConversation.js";

const useSendMessage = () => {

    const [loading, setLoading] = useState(false)
    //get the global state
    const { messages, setMessages, selectedConversation } = useConversation()
    console.log(selectedConversation)
    
    const sendMessage = async (message) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify({message})
            })
            const data = await res.json()

            if (data.error) {
                throw new Error(data.error)
            }

            //update global state
            setMessages([...messages,data])

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false)
        }
    }

  return (
    {loading,sendMessage}
  )
}

export default useSendMessage