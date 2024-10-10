import { HiOutlineLogout } from "react-icons/hi";
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../../redux/user/userSlice.js';

const Logoutbtn = () => {
  const dispatch = useDispatch();
  const handleSignOut = async (e) => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='py-4 p-2 bg-slate-200 dark:bg-slate-600'>
      <div onClick={handleSignOut} className="flex gap-2 cursor-pointer"><HiOutlineLogout className="text-2xl" /> Logout</div>
    </div>
  )
}

export default Logoutbtn