import React from 'react'
import Sidebar from './sidebar/Sidebar'
import MessageContainer from './message/MessageContainer'

const DashChats = () => {
  return (
    <>
      <div className="p-3 md:mx-auto w-full">
        <div className='h-full flex rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800 w-full'>
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  )
}

export default DashChats