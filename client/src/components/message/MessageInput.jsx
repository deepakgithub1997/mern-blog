import { TextInput } from "flowbite-react";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import useSendMessage from "../../hooks/useSentMessages.js";
import { Spinner } from "flowbite-react";
const MessageInput = () => {
  const { loading, sendMessage } = useSendMessage();

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    await sendMessage(message);
    setMessage("");
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full relative'>
        <TextInput
          type='text'
          placeholder='Send a message'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
          {loading ? <Spinner /> : <BsSend />}
        </button>
      </div>
    </form>
  );
};
export default MessageInput;  