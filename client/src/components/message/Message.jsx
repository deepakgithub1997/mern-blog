import React from 'react'

const Message = () => {
  return (
    <div>

      <div class="messagesent">
        <div className="messagecard">
          <div className="w-10 h-10 rounded-full border border-slate-600 overflow-hidden">
            <img className="w-full " src="https://firebasestorage.googleapis.com/v0/b/mern-blog-58682.appspot.com/o/1727155945687avataaars%20(1).png?alt=media&token=fe953332-18fa-42e6-bfcf-88cabce50fd0" alt="User 1" />
          </div>
          <div>
            <div className="chatbubble text-sm bg-indigo-500 p-3 rounded-lg">
              Hey! How’s it going?
            </div>
            <div className="time text-xs font-medium text-gray-500">21:40</div>
          </div>
        </div>
      </div>

      <div class="messagereceived">
        <div className="messagecard">
          <div className="w-10 h-10 rounded-full border border-slate-600 overflow-hidden">
            <img className="w-full " src="https://firebasestorage.googleapis.com/v0/b/mern-blog-58682.appspot.com/o/1727155945687avataaars%20(1).png?alt=media&token=fe953332-18fa-42e6-bfcf-88cabce50fd0" alt="User 1" />
          </div>
          <div>
            <div className="chatbubble text-sm bg-indigo-500 p-3 rounded-lg">
              Hey! How’s it going?
            </div>
            <div className="time text-xs font-medium text-gray-500">21:40</div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Message