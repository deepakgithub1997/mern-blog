import { ref, getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react'
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

const Createpost = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
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
            setFormData({ ...formData, profilePicture: downloadURL });
          })
        }
      );
    } catch (error) {
      setImageUploadError('Image Uploading Failed 2');
      setImageUploadProgress(null);
    }
  }

  return (
    <div className='py-10 px-3 max-w-3xl mx-auto min-h-screen'>
      <div className='text-center text-3xl mb-7 font-semobold'>Create a Post</div>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type="text" placeholder='Title' required id="title" className='flex-1' />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
          {
            formData.profilePicture && (
              <Link className="font-medium text-blue-600" to={formData.profilePicture} target='_blank'>View Image</Link>
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
        <ReactQuill theme="snow" placeholder='Write Something...' className='h-72 mb-12' required />
        <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>


      </form>
    </div>
  )
}

export default Createpost