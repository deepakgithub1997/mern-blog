import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeletions from "../skeletons/MessageSkeletions.jsx";
import Message from "./Message.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const sectionRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const section = sectionRef.current;
      section.scrollTop = section.scrollHeight;
    }, 200);
  }, [messages]);

  return (
    <div className='customscroll px-4 flex-1 h-[375px] overflow-auto scroll-smooth' ref={sectionRef}>
      {!loading && messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} >
            <Message message={message} />
          </div>
        ))
      }

      {loading && <MessageSkeletions />}
      {!loading && messages.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <p className="text-center display-inline text-gray-600 dark:text-gray-400">Send a message to start conversation</p>
        </div>
      )}

    </div>
  );
};
export default Messages;