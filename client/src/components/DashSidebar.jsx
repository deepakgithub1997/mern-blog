import { Sidebar } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { HiUser, HiDocumentText, HiArrowSmRight, HiUsers, HiChartPie, HiAtSymbol, HiChatAlt2 } from 'react-icons/hi';
import { FaComments } from "react-icons/fa";
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
    <Sidebar className='min-w-[250px] h-[510px] md:h-auto w-full md:w-56'>
      <Sidebar.Items >
        <Sidebar.ItemGroup className='flex flex-col flex-1'>
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard/?tab=dash">
              <Sidebar.Item active={tab === 'dash' || !tab} icon={HiChartPie} as='div'>
                dashboard
              </Sidebar.Item>
            </Link>
          )}

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
          <Link to="/dashboard/?tab=chat">
            <Sidebar.Item active={tab === 'chat'} icon={HiChatAlt2} as='div'>
              Chats
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <Link to="/dashboard/?tab=comments">
              <Sidebar.Item active={tab === 'comments'} icon={HiAtSymbol} as='div'>
                Comments
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