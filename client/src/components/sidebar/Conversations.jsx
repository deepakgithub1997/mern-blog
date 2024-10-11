import { useSelector } from 'react-redux';
import useGetConversations from '../../hooks/useGetConversations.js';
import Conversation from "./Conversation.jsx";
import { Spinner } from "flowbite-react";
import useConversation from "../../zustand/useConversation.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  const { currentUser } = useSelector((state) => state.user);
  const { searchInput } = useConversation();

  const filteredUsers = conversations.filter(conversation => {
    const notCurrentUser = conversation._id !== currentUser._id;
    const hasSearchText = searchInput ? conversation.fullname.toLowerCase().includes(searchInput.toLowerCase()) : true;
    return notCurrentUser && hasSearchText;
  });

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