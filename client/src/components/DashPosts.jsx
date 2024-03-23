import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Table } from 'flowbite-react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setuserPost] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json();
        if (res.ok) {
          setuserPost(data.posts);
          console.log(data.posts.length);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        setuserPost((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 '>
      {
        currentUser.isAdmin && userPosts.length > 0 ? (<>
          <Table hoverable className='shadow-md w-full'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {
                userPosts.map((post) => (
                  <Table.Row key={post._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`} target='_blank' ><img src={post.image} alt={post.title} className="max-w-40 h-20" /></Link>
                    </Table.Cell>
                    <Table.Cell><p className="whitespace-nowrap w-80 text-ellipsis overflow-hidden">{post.title}</p></Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-1">
                        <Link to={`/post/${post.slug}`} target='_blank' >
                          <Button color="blue" className="w-8 h-8" size="xs"><FaEye /></Button>
                        </Link>
                        <Link to={`/updatepost/${post._id}`} target='_blank' >
                          <Button color="success" className="w-8 h-8" size="xs"><FaEdit /></Button>
                        </Link>
                        <Button color="failure" className="w-8 h-8" size="xs" ><FaTrash /></Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              }
            </Table.Body>
          </Table>
          {
            showMore && <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show More</button>
          }
        </>)
          : (
            <p className="text-center">You have no posts.</p>
          )
      }

    </div>
  )
}
export default DashPosts