import { Table, Button, Modal, ModalHeader } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deletingComment, setDeletingComment] = useState(null);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getAllComments')
        if (res.ok) {
          const data = await res.json();
          setComments(data.allcomments);
          if (data.allcomments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getAllComments?startIndex=${startIndex}`);
      if (res.ok) {
        const data = await res.json();
        setComments((prev) => [...prev, ...data.allcomments]);
        if (data.allcomments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }


  }

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/comment/deleteComment/${deletingComment}`,
        {
          method: 'DELETE',
        });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== deletingComment)
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 '>
      {
        currentUser.isAdmin && comments.length > 0 ? (
          <>
            <Table hoverable className='shadow-md w-full'>
              <Table.Head>
                <Table.HeadCell>Date Updated</Table.HeadCell>
                <Table.HeadCell>content</Table.HeadCell>
                <Table.HeadCell>postId</Table.HeadCell>
                <Table.HeadCell>userId</Table.HeadCell>
                <Table.HeadCell>numberOfLikes</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {
                  comments.map((comment) => (
                    <Table.Row key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                      <Table.Cell>{comment.content}</Table.Cell>
                      <Table.Cell>{comment.postId}</Table.Cell>
                      <Table.Cell>{comment.userId}</Table.Cell>
                      <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                      <Table.Cell><Button onClick={() => { setShowModal(true); setDeletingComment(comment._id) }} color="failure" ><FaTrash /></Button></Table.Cell>
                    </Table.Row>
                  ))
                }
              </Table.Body>
            </Table>
            {
              showMore && <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7"></button>
            }
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="h-14 w-14 terxt-gray-400 dark:text-gray-200 mb-4 mx-auto"></HiOutlineExclamationCircle>
                  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                    Are you Sure you want to delete the Comment?
                  </h3>
                  <div className='flex justify-center gap-4'>
                    <Button color="failure" onClick={handleDeleteComment}>Yes I'm Sure</Button>
                    <Button color="gray" onClick={() => setShowModal(false)}>No, Cancel</Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        ) : (
          <p className="text-center">No Comments.</p>
        )
      }


    </div >
  )
}

export default DashComments