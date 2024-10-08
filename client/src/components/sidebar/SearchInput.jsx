import { TextInput } from "flowbite-react";
import { IoSearchSharp } from "react-icons/io5";

const SearchInput = () => {
  return (
    <form className='flex items-center gap-2 p-2'>
      <TextInput type='text' placeholder='Search…' />
      <button type='submit' className='bg-transperent-100'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
      </button>
    </form>
  );
};
export default SearchInput;