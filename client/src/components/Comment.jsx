import moment from 'moment';
import React, { useEffect, useState } from 'react';

const Comment = ({ comment }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log(comment);
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
              {moment(comment.createdAt).fromNow()}
            </span>
          </div>
          <div className="text-gray-500 pb-2">
            {comment.content}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex justify-start pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
              <button type="button" className="text-gray-400 hover:text-blue-500 flex items-center">
                {comment.numberOfLikes} Like
              </button>
              <p className="text-gray-400 "></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment