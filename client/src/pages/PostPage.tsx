import React, { FC, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import CallAction from '../components/CallAction';

interface Post {
  title: string;
  category: string;
  image: string;
  createdAt: string;
  content: string;
}

const PostPage: FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      try {
        setLoading(true);
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();
        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) return (
    <div className='flex justify-center items-center min-h-screen'>
      <Spinner size="xl" />
    </div>
  );

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <img src={post?.image} alt={post?.title} className="mt-10 p-3 max-h-[600px] w-full object-cover" />
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        {post?.title}
      </h1>
      <Link to={`/search?category=${post?.category}`} className="self-center mt-5">
        <Button color="gray" pill size="xs">{post?.category}</Button>
      </Link>
      <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>
      <div className="p-3 max-w-2xl mx-auto w-full post-content" dangerouslySetInnerHTML={{ __html: post?.content! }} />
      <div className="max-w-4xl mx-auto w-full">
        <CallAction />
      </div>
    </main>
  );
}

export default PostPage;