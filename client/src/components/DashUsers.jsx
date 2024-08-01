import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Button, Modal, Table } from 'flowbite-react';
import { FaTrash } from 'react-icons/fa';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

const DashUsers = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteuserId, setDeleteuserId] = useState(null);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/user/getusers?userId=${currentUser._id}`)
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
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
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok) {
        ((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${deleteuserId}`,
        {
          method: 'DELETE',
        });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) =>
          prev.filter((user) => user._id !== deleteuserId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 '>
      {
        currentUser.isAdmin && users.length > 0 ? (<>
          <Table hoverable className='shadow-md w-full'>
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Profile Pic</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {
                users.map((user) => (
                  <Table.Row key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <img src={user.profilePicture} className="rounded-full w-20" alt={user.username} />
                    </Table.Cell>
                    <Table.Cell><p className="whitespace-nowrap w-80 text-ellipsis overflow-hidden">{user.username}</p></Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.isAdmin ? <FaCheck color='green' /> : <RxCross2 color='red' />}</Table.Cell>
                    <Table.Cell>
                      {user.isAdmin ? <></> : <>
                        <div className="flex gap-1">
                          <Button onClick={() => { setShowModal(true); setDeleteuserId(user._id); }} color="failure" className="" size="xs" ><FaTrash /></Button>
                        </div>
                      </>
                      }
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
            <p className="text-center">There is no users.</p>
          )
      }
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 terxt-gray-400 dark:text-gray-200 mb-4 mx-auto"></HiOutlineExclamationCircle>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you Sure you want to delete the account?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color="failure" onClick={handleDeleteUser}>Yes I'm Sure</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div >

  )
}
export default DashUsers