import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineUserGroup, HiArrowNarrowUp, HiAnnotation, HiDocumentText } from 'react-icons/hi';
import { Button, Table, TableBody, TableCell, TableRow } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);

  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);

  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useSelector(state => state.user);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
      }
    }

    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getAllComments?limit=5`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.allcomments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className='p-3 md:mx-auto w-full'>
      <div className="flex flex-wrap justify-content-between gap-4 p-3 md:mx-auto">
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:flex-1  w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600  text-white rounded-full p-3 text-5xl shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex text-green-500 items-center'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:flex-1  w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Comments</h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full p-3 text-5xl shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex text-green-500 items-center'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:flex-1  w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div>
              <h3 className='text-gray-500 text-md uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full p-3 text-5xl shadow-lg' />
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex text-green-500 items-center'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last Month</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap py-3 gap-4 mx-auto p-3 justify-center">
        <div className="flex flex-1 flex-col md:mx-auto shadow-md p-3 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2>Recent Users</h2>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={"/dashboard?tab=users"}>View All</Link>
            </Button>
          </div>
          <div className="">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>User image</Table.HeadCell>
                <Table.HeadCell>username</Table.HeadCell>
              </Table.Head>
              {
                users && users.map((user) =>
                  < TableBody key={user._id} className='divide-y' >
                    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>
                        <img src={user.profilePicture} alt="" className="w-10 h-10 rounded-full bg-gray-500 " />
                      </Table.Cell>
                      <Table.Cell>
                        <Link to={`/profile/${user.username}`}>
                          {user.username}
                        </Link>
                      </Table.Cell>
                    </TableRow>
                  </TableBody>
                )
              }
            </Table>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:mx-auto shadow-md p-3 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2>Recent Comments</h2>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={"/dashboard?tab=comments"}>View All</Link>
            </Button>
          </div>
          <div className="">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Comment By</Table.HeadCell>
                <Table.HeadCell>Comments</Table.HeadCell>
                <Table.HeadCell>Number of Likes</Table.HeadCell>
              </Table.Head>
              {
                comments && comments.map((comment) =>
                  < TableBody key={comment._id} className='divide-y' >
                    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='w-50'>
                        {comment.userId}
                      </Table.Cell>
                      <Table.Cell>
                        <p className='line-clamp-2'>{comment.content}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {comment.numberOfLikes}
                      </Table.Cell>
                    </TableRow>
                  </TableBody>
                )
              }
            </Table>
          </div>
        </div>
        <div className="flex flex-1 flex-col md:mx-auto shadow-md p-3 rounded-md dark:bg-gray-800">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h2>Recent Posts</h2>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={"/dashboard/?tab=posts"}>View All</Link>
            </Button>
          </div>
          <div className="">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Post Image</Table.HeadCell>
                <Table.HeadCell>Post Title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
              </Table.Head>
              {
                posts && posts.map((post) =>
                  <TableBody key={post._id} className='divide-y' >
                    <TableRow className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='w-50'>
                        <img src={post.image} alt="" class="max-w-40 h-20" />
                      </Table.Cell>
                      <Table.Cell>
                        <p className='line-clap-2'>{post.title}</p>
                      </Table.Cell>
                      <Table.Cell>
                        {post.category}
                      </Table.Cell>
                    </TableRow>
                  </TableBody>
                )
              }
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashBoard