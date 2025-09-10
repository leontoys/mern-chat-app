import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/socketContext'

const Conversation = ({ conversation, emoji, lastIdx }) => {
    //when a conversation is clicked we are setting that as selected in the on click of div
    const { selectedConversation, setSelectedConversation } = useConversation()  
    const { onlineUsers } = useSocketContext()
    const isOnline = onlineUsers.includes(conversation._id) //to check if the receiver
    //  is in the online users array

    if (conversation.userName == "johndoe" || conversation.userName == "jandoe") {
        console.log("online users in conversation", onlineUsers)
        console.log("is online?", isOnline)
        console.log("conversation id", conversation._id, conversation.fullName)        
    }    
    const isSelected = selectedConversation?._id === conversation._id

    return (
        <>

            <div
                className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
				${isSelected ? "bg-sky-500" : ""}
			`}
                onClick={() => setSelectedConversation(conversation)}>
                <div className={`avatar ${isOnline?"avatar-online":""}`}>
                    <div className='w-12 rounded-full'>
                        <img src={conversation.profilePic} alt='user avatar' />
                    </div>
                </div>

                <div className='flex flex-col flex-1'>
                    <div className='flex gap-3 justify-between'>
                        <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                        <span className='text-xl'>{emoji}</span>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider my-0 py-0 h-1' />}
        </>
    )
}

export default Conversation