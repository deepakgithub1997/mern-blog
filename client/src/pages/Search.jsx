import { Button, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard.jsx';

const Search = () => {
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    sort: '',
    category: ''
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebardata({
        ...sidebardata,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);

        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    }
    fetchPosts();

  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebardata({ ...sidebardata, sort: order })
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebardata({ ...sidebardata, category: category })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);

    if (sidebardata.searchTerm != null) {
      urlParams.set('searchTerm', sidebardata.searchTerm);
    }
    if (sidebardata.sort != null) {
      urlParams.set('sort', sidebardata.sort);
    }

    if (sidebardata.category != null) {
      urlParams.set('category', sidebardata.category);
    }
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  const handleShowMore = async () => {
    const startIndex = posts.length;
    setLoading(true);
    const res = await fetch(`/api/post/getposts?startIndex=${startIndex}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts((prev) => [...prev, ...data.posts]);
      setLoading(false);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  }

  return (
    <div className='flex flex-col md:flex-row'>
      <div className="min-w-[300px] p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3 justify-between">
            <label className='font-semibold'>Search Term:</label>
            <TextInput type='text' placeholder='Search...' id="searchTerm"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-3 justify-between">
            <label className='font-semibold'>Sort:</label>
            <Select onChange={handleChange} value={sidebardata.sort} id="sort">
              <option value="asc">Latest</option>
              <option value="desc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-3 justify-between">
            <label className='font-semibold'>Category:</label>
            <Select
              onChange={handleChange}
              value={sidebardata.category}
              id='category'
            >
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='nextjs'>Next.js</option>
              <option value='javascript'>JavaScript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply Filters
          </Button>
        </form>
      </div>
      {
        loading ? (<>
          <div className="flex p-7 flex-1">
            <p className="text-center">Loading...</p>
          </div>
        </>) : (
          <>
            {
              posts.length > 0 ? (
                <div className="flex flex-wrap p-7 gap-4 flex-1">
                  {
                    posts && posts.map((post) =>
                      <PostCard key={post._id} post={post} />
                    )
                  }
                  {showMore && <button onClick={handleShowMore} className="w-full text-teal-500 self-center text-sm py-7">Show More</button>}
                </div>
              ) : (
                <div className="flex p-7 flex-1">
                  <p className="text-center">You have no posts.</p>
                </div>
              )
            }
          </>
        )
      }


    </div >
  )
}

export default Search