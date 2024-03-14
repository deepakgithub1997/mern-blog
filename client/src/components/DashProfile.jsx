import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { ref, getDownloadURL, getStorage, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const { currentUser } = useSelector(state => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileupLoadingProgress, setImageFileupLoadingProgress] = useState(null);
  const [imageFileupLoadingError, setImageFileupLoadingError] = useState(null);

  console.log(imageFileupLoadingProgress, imageFileUrl);

  const filePickerRef = useRef();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileupLoadingError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uplaodTask = uploadBytesResumable(storageRef, imageFile);
    uplaodTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileupLoadingProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileupLoadingError('Could Not upload Image (File max 2MB)');
        setImageFileupLoadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uplaodTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        })
      }
    )
  }

  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type='file' accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden />
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full relative' onClick={() => { filePickerRef.current.click() }}>
          {imageFileupLoadingProgress && <CircularProgressbar value={imageFileupLoadingProgress || 0} text={`${imageFileupLoadingProgress}%`} strokeWidth={5} styles={{
            root: {
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              left: 0,
            },
            path: {
              stroke: `rgba(62,152, 199, ${imageFileupLoadingProgress / 100})`,
            }
          }} />}
          <img src={imageFileUrl ? imageFileUrl : currentUser.profilePicture} alt="User" className='rounded-full h-full w-full object-cover border-8 border-[lightgray]' />
        </div>
        {
          imageFileupLoadingError && <Alert color='failure'>{imageFileupLoadingError}</Alert>
        }
        <TextInput type='text' id="username" placeholder='username' defaultValue={currentUser.username} />
        <TextInput type='email' id="email" placeholder='email' defaultValue={currentUser.email} />
        <TextInput type='password' id="password" placeholder='password' defaultValue={currentUser.password} />
        <Button type="submit" outline gradientDuoTone="purpleToBlue">
          Update
        </Button>
      </form>
      <div className='text-red-500 flex justify-between mt-3'>
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>SignOut</span>
      </div>
    </div>
  )
}

export default DashProfile