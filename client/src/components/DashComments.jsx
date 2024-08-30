import { Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  // useEffect(() => {
  //   const fetchComments = async () => {
  //     try {
  //       const res = await fetch('/api/comment/getcomments')
  //       const data = await res.json();
  //       console.log(res);
  //       if (res.ok) {
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   fetchComments();
  // }, [currentUser._id]);

  return (
    <div className='table-auto overflow-x-auto md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 '>
      <Table hoverable className='shadow-md w-full'>
        <Table.Head>
          <Table.HeadCell>Date Updated</Table.HeadCell>
          <Table.HeadCell>postId</Table.HeadCell>
          <Table.HeadCell>content</Table.HeadCell>
          <Table.HeadCell>userId</Table.HeadCell>
          <Table.HeadCell>numberOfLikes</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
            <Table.Cell>8/1/2024</Table.Cell>
            <Table.Cell>14234928498249828934</Table.Cell>
            <Table.Cell>Hi i like the post very much!</Table.Cell>
            <Table.Cell>93002020202020202020</Table.Cell>
            <Table.Cell>4</Table.Cell>
            <Table.Cell><Button color="failure" ><FaTrash /></Button></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div >
  )
}

export default DashComments