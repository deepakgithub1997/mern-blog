import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'
import { FaThumbsUp } from 'react-icons/fa';

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getUser();
  }, [comment]);

  const handleEditComment = () => {
    setIsEditing(true);
    setEditContent(comment.content);
  }

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: editContent,
        })
      })
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editContent)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>
      <div className="flex p-4 border-b dark:border-gray-600 text-sm">
        <div className="flex-shrink-0 mr-3">
          <img className="w-10 h-10 rounded-full bg-gray-200" src={user.profilePicture} alt={user.username} />
        </div>
        <div className="flex-1">

          <div className="flex items-center mb-1">
            <span className="font-bold mr-1 text-xs truncate">
              {user ? `@${user.username}` : `anonymous user`}
            </span>
            <span className="text-gray-500 text-xs">
              {/* {moment(comment.createdAt).fromNow()} */}
            </span>
          </div>
          {
            isEditing ? (
              <>
                <Textarea className='mb-2'
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className='flex align-center justify-end gap-2'>
                  <Button
                    type="button"
                    size='sm'
                    gradientDuoTone='purpleToBlue'
                    onClick={handleSave}
                  >Save</Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    type="button"
                    size='sm'
                    gradientDuoTone='purpleToBlue'
                    outline
                  >Cancel</Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-gray-500 pb-2"> {comment.content}</div>
                <div className="flex justify-between items-center">
                  <div className="flex justify-start pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
                    <button type="button" onClick={() => onLike(comment._id)}
                      className={`text-gray-400 hover:text-blue-500 flex items-center 
                      ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                      <FaThumbsUp className='text-sm'></FaThumbsUp>
                    </button>
                    <p className="text-gray-500">{comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "Like" : "Likes")} </p>
                    {
                      currentUser && (currentUser._id === comment.userId || currentUser && currentUser.isAdmin) && (
                        <>
                          <button
                            onClick={handleEditComment}
                            type="button"
                            className='text-gray-400 hover:text-blue-500'
                          >Edit
                          </button>
                          <button
                            onClick={() => onDelete(comment._id)}
                            type="button"
                            className='text-gray-400 hover:text-red-500'
                          >Delete
                          </button>
                        </>
                      )
                    }
                  </div>
                </div>
              </>
            )
          }

        </div>
      </div>
    </div >
  )
}

export default Comment