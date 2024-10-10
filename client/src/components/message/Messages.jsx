import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeletions from "../skeletons/MessageSkeletions.jsx";
import Message from "./Message.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessages();

  return (
    <div className='customscroll px-4 flex-1 h-[375px] overflow-auto'>
      {loading && <MessageSkeletions />}
      {
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))
      }
    </div>
  );
};
export default Messages;