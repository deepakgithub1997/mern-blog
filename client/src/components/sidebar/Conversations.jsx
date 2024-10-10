import { useSelector } from 'react-redux';
import useGetConversations from '../../hooks/useGetConversations.js';
import Conversation from "./Conversation.jsx";
import { Spinner } from "flowbite-react";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { currentUser } = useSelector((state) => state.user);
  const filteredUsers = conversations.filter(conversation => conversation._id !== currentUser._id);

  return (
    <div className='customscroll flex flex-col gap-1 h-[375px] overflow-auto p-1'>
      {
        filteredUsers.map((filteredUser) => (
          <Conversation key={filteredUser._id} filteredUser={filteredUser} />
        ))
      }
      {
        loading ? <Spinner /> : null
      }

    </div>
  );
};
export default Conversations;