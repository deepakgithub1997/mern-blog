import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { TiMessages } from "react-icons/ti";


import Messages from './Messages'
import MessageInput from './MessageInput'
import useConversation from '../../zustand/useConversation.js';

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    //cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className=" flex flex-col flex-1">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className='bg-slate-200 dark:bg-slate-600 px-4 py-2 mb-2 '>
            <span className='label-text'>To:</span><span className="font-bold capitalize"> {selectedConversation.fullname} </span>
          </div>
          <div className='divider flex-1 p-1'>
            <Messages />
          </div>
          <MessageInput />
        </>
      )}
    </div>
  )
}

export default MessageContainer


const NoChatSelected = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='px-4 text-center sm:text-lg md:text-xl dark:text-gray-200 font-semibold flex flex-col items-center gap-2'>
        <p>Welcome 👋 {currentUser.fullname} ❄</p>
        <p>Select a chat to start messaging</p>
        <TiMessages className='text-3xl md:text-6xl text-center' />
      </div>
    </div>
  );
};