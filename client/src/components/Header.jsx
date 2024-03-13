import { Navbar, Button, TextInput, Dropdown, Avatar, DropdownHeader, DropdownItem, DropdownDivider } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import Logo from '../elements/Logo';
import { useSelector } from 'react-redux';


const Header = () => {
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
  return (
    <Navbar className="border-b-2">
      <Logo size="text-sm sm:text:xl font-semibold" />
      <form>
        <TextInput
          type="text"
          placeholder='Search..'
          rightIcon={AiOutlineSearch}
          className='hidden lg:inline'
        />
      </form>
      <Button className="w-12 h-10 lg:hidden" color='gray' pill>
        <AiOutlineSearch />
      </Button>
      <div className='flex gap-2 md:order-2'>
        <Button className='w-12 h-10 hidden sm:inline' color='gray' pill>
          <FaMoon />
        </Button>
        {
          currentUser ?
            <>
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar alt='User' img={currentUser.profilePicture} rounded />
                }
              >
                <Dropdown.Header>
                  <span className='block text-sm'>@{currentUser.username}</span>
                  <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                </Dropdown.Header>
                <Link to={'/dashboard'}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Dropdown.Divider></Dropdown.Divider>
                <Dropdown.Item>Signout</Dropdown.Item>
              </Dropdown>
            </> :
            <Link to="/sign-in">
              <Button outline gradientDuoTone="purpleToBlue">
                Sign In
              </Button>
            </Link>
        }

        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header