import Conversations from "./Conversations.jsx";
import LogoutButton from "./Logoutbtn.jsx";
import SearchInput from "./SearchInput.jsx";

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 flex justify-stretch flex-col md:min-w-[250px]'>
      <SearchInput />
      <div className='divider flex-1 p-1'>
        <Conversations />
      </div>
      <LogoutButton />
    </div>
  );
};
export default Sidebar;