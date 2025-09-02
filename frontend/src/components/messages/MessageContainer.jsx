import React from 'react'
import Header from './Header'
import Messages from './Messages'
import MessageInput from './MessageInput'

const MessageContainer = () => {
  return (
    <div className='md:min-w-[450px] flex flex-col'>
      <>
        <Header />
        <Messages />
        <MessageInput/>
      </>
    </div>
  )
}

export default MessageContainer