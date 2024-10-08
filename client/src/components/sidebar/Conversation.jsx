import { RxAvatar } from "react-icons/rx";


const Conversation = () => {
  return (
    <>
      <div className='flex gap-2 items-center hover:bg-[#3f83f880] hover:dark:bg-[rgb(16,23,42)]  rounded px-1 py-2 cursor-pointer'>
        <div className='avatar online'>
          <div className='w-10 rounded-full'>
            <RxAvatar className="text-2xl" />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p>John Doe</p>
            <span className='text-xl'>🎃</span>
          </div>
        </div>
      </div>

      <div className='divider my-0 py-0 h-1' />
    </>
  );
};
export default Conversation;