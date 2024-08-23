import { Alert, Button, Textarea } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Comment from './Comment';

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: comment, postId, userId: currentUser._id }),
      })

      const data = await res.json();

      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: 'PUT',
      });

      if (res.ok) {
        const data = await res.json();

        setComments(comments.map((comment) =>
          comment._id === commentId ? {
            ...comment,
            likes: data.likes,
            numberOfLikes: data.likes.length,
          } : comment
        ));
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleEdit = async (comment, editContent) => {
    setComments(
      comments.map((c) =>
        c._id === comment._id ? { ...c, content: editContent } : c)
    )
  }

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {
        currentUser ?
          (
            <div className='flex items-center gap-1 text-gray-500 text-sm'>
              <p>Signed in as:</p>
              <img src={currentUser.profilePicture} alt={currentUser.username} className='h-5 w-5 object-cover rounded-full' />
              <Link to={'/dashboard?tab=profile'} className='text-cyan-600 hover:underline'>@{currentUser.username}</Link>
            </div>
          ) :
          (
            <div className='text-sm my-5'>
              you must be signed in to comment.
              <Link to={'/sign-in'} className='text-cyan-600 hover:underline'> Sign in</Link>
            </div>
          )
      }
      {
        currentUser && (
          <form className='border border-teal-500 rounded-md p-3 mt-4' onSubmit={handleSubmit}>
            <Textarea
              placeholder='Add a Comment...'
              rows='3'
              maxLength='200'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <div className="flex justify-between items-center mt-3">
              <p>{200 - comment.length} char remaining</p>
              <Button type="submit" outline gradientDuoTone='purpleToBlue'>Submit</Button>
            </div>
            {
              commentError && <Alert color="failure" className="mt-5">{commentError}</Alert>
            }
          </form>
        )
      }
      {
        comments.length == 0 ? (
          <p className="text-sm my-5">No Comments yet!</p>
        ) : (
          <>
            <div className='text-sm my-5 flex items-center gap-1'>
              <p>Comments:</p>
              <div className="border border-gray-500 py-1 px-2 rounded-sm">
                <p>{comments.length}</p>
              </div>
            </div>
            {
              comments.map((comment, index) => (
                <Comment key={index} comment={comment} onLike={handleLike} onEdit={handleEdit} />
              ))
            }
          </>
        )
      }
    </div >
  )
}
