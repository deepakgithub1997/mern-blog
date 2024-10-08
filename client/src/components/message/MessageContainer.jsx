import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

const MessageContainer = () => {
  return (
    <div className=" flex flex-col flex-1">
      <>
        {/* Header */}
        <div className='bg-slate-200 dark:bg-slate-600 px-4 py-2 mb-2 '>
          <span className='label-text'>To:</span><span className="font-bold"> John Deo</span>
        </div>
        <div className='divider flex-1 p-1'>
          <Messages />
        </div>
        <MessageInput />
      </>
    </div >
  )
}

export default MessageContainer