import { useSelector } from 'react-redux';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime.js';

const Message = ({ message }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { selectedConversation } = useConversation();
  const fromMe = currentUser._id === message.senderId;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "messagereceived" : "messagesent";
  const profilePic = fromMe ? currentUser.profilePicture : selectedConversation.profilePicture;

  return (
    <>
      <div className={`mb-3 ${chatClassName}`}>
        <div className="messagecard">
          <div className="w-10 h-10 rounded-full border border-slate-600 overflow-hidden">
            <img className="w-full " src={profilePic} alt="User 1" />
          </div>
          <div>
            <div className="chatbubble text-sm bg-indigo-500 p-3 rounded-lg">
              {message.message}
            </div>
            <div className="time text-xs font-medium text-gray-500">{formattedTime}</div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Message