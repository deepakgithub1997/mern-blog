import { RxAvatar } from "react-icons/rx";
import useConversation from "../../zustand/useConversation";

const Conversation = ({ filteredUser }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === filteredUser._id;
  return (
    <>
      <div className={`flex gap-2 items-center hover:bg-[#3f83f880] hover:dark:bg-[rgb(16,23,42)]  rounded px-2 py-2 cursor-pointer  ${isSelected ? "dark:bg-[rgb(16,23,42)]" : ""}`}
        onClick={() => setSelectedConversation(filteredUser)}
      >
        <div className='avatar online'>
          <div className='w-10 rounded-full'>
            <img src={filteredUser.profilePicture} className='rounded-full w-8' />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className="capitalize">{filteredUser.fullname}</p>
          </div>
        </div>
      </div>

      <div className='divider my-0 py-0 h-1' />
    </>
  );
};
export default Conversation;