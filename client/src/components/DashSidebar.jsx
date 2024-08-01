import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiUser, HiDocumentText, HiArrowSmRight, HiUsers } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';

const DashSidebar = () => {
  const { currentUser } = useSelector(state => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignOut = async (e) => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok) {
      } else {
        dispatch(signoutSuccess(data));
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <Sidebar className='min-h-full w-full md:w-56'>
      <Sidebar.Items className='md:min-h-screen'>
        <Sidebar.ItemGroup className='flex flex-col flex-1'>
          <Link to="/dashboard/?tab=profile">
            <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={currentUser.isAdmin ? "admin" : "user"} as='div'>
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard/?tab=posts">
              <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} as='div'>
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link to="/dashboard/?tab=users">
              <Sidebar.Item active={tab === 'users'} icon={HiUsers} as='div'>
                Users
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item icon={HiArrowSmRight} onClick={handleSignOut}>
            Signout
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  )
}

export default DashSidebar