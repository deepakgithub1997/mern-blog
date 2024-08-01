import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

const Createpost = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });
  const [publishError, setPublishError] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await fetch('/api/post/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          navigate(`/post/${data.slug}`);
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }

  const [inputError, setInputError] = useState({});
  const validateForm = () => {
    let valid = true;
    const { title, category, image, content } = formData;
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
    if (content.trim().length < 100) {
      newErrors.content = 'Please Enter more than 100 Characters';
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

  return (
    <div className='py-10 px-3 max-w-3xl mx-auto min-h-screen'>
      <div className='text-center text-3xl mb-7 font-semobold'>Create a Post</div>
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
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            {inputError.title && <span className="text-red-600 text-sm">{inputError.title}</span>}
          </div>
          <Select
            id="category"
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select a Category</option>
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
        {inputError.image && <span className="text-red-600 text-sm">{inputError.image}</span>}
        {
          imageUploadError && (
            <Alert color='failure'>{imageUploadError}</Alert>
          )
        }
        <div>
          <ReactQuill
            id="content"
            theme="snow"
            placeholder='Write Something...*'
            className="quill-custom"
            onChange={(value) => setFormData({ ...formData, content: value })}
          />
          {inputError.content && <span className="text-red-600 text-sm">{inputError.content}</span>}
        </div>

        <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>


      </form>
    </div>
  )
}

export default Createpost