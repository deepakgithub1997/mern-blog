import { useState } from "react";
import { TextInput } from "flowbite-react";
import useConversation from "../../zustand/useConversation.js";

const SearchInput = () => {
  // const [search, setSearch] = useState('');
  const { searchInput, setSearchInput } = useConversation();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  }

  return (
    <div className='flex items-center gap-2 p-2'>
      <TextInput type='text' placeholder='Search…' onChange={handleChange} value={searchInput} className="w-full" />
    </div>
  );
};
export default SearchInput;