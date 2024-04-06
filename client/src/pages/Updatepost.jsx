import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Updatepost = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const { currentUser } = useSelector(state => state.user);
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  useEffect(() => {
    try {
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?postId=${postId}`);
        const data = await res.json();

        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data.posts[0]);
        }
      }
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image Uploading Failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          })
        }
      );
    } catch (error) {
      setImageUploadError('Image Uploading Failed 2');
      setImageUploadProgress(null);
    }
  }

  const [inputError, setInputError] = useState({});
  const validateForm = () => {
    let valid = true;
    const { title, image, content } = formData;
    const newErrors = {
      title: "",
      category: "",
      image: "",
      content: "",
    };
    if (title.trim() === "") {
      newErrors.title = 'Please Enter Title';
      valid = false;
    }

    if (image.trim() === "") {
      newErrors.image = 'Please upload Image';
      valid = false;
    }
    if (content.trim() === "") {
      newErrors.content = 'Please Enter Content';
      valid = false;
    }

    setInputError(newErrors);
    return valid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }

    } catch (error) {
      setPublishError('Something went wrong');
    }

  }

  return (
    <div className='py-10 px-3 max-w-3xl mx-auto min-h-screen'>
      <div className='text-center text-3xl mb-7 font-semobold'>Update a Post {formData._id}</div>
      {
        publishError && <Alert color="failute">{publishError}</Alert>
      }
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <div className='flex-1'>
            <TextInput
              type="text"
              placeholder='Title*'
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {inputError.title && <span className="text-red-600 text-sm">{inputError.title}</span>}
          </div>
          <Select
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="" defaultValue>Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border p-3'>
          <FileInput id="image" type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          {
            formData.image && (
              <Link className="font-medium text-blue-600" to={formData.image} target='_blank'>View Image</Link>
            )
          }
          <Button type="button" gradientDuoTone="purpleToBlue" size="sm" outline onClick={handleUploadImage}>
            {
              imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0} %`} />
                </div>
              ) : (
                'Upload Image'
              )}
          </Button>
        </div>
        {
          imageUploadError && (
            <Alert color='failure'>{imageUploadError}</Alert>
          )
        }
        <div>
          <ReactQuill
            id="content"
            value={formData.content}
            theme="snow"
            placeholder='Write Something...*'
            className="quill-custom"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          {inputError.content && <span className="text-red-600 text-sm">{inputError.content}</span>}
        </div>

        <Button type="submit" gradientDuoTone="purpleToPink">Update Post</Button>
      </form>
    </div>
  )
}

export default Updatepost