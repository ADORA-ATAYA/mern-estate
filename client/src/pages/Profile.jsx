import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { updateUserFailure,updateUserStart,updateUserSuccess,deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

const Profile = () => {
  const { currentUser ,loading, error} = useSelector((state) => state.user);
  const [File, setFile] = useState(undefined);
  const [FilePer, setFilePer] = useState(0)
  const [fileUploadError, setfileUploadError] = useState(false)
  const [FormData, setFormData] = useState({})
  const [UpdateSuccess, setUpdateSuccess] = useState(false)
  const dispatch  = useDispatch()

  useEffect(()=>{
    if(File){
      handleFileUpload( File);
    }
  },[File]);
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef , file);

    uploadTask.on('state_changed' , (snapshot)=>{
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
      setFilePer(Math.round(progress));
    },
    (error) =>{
      error
      setfileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref)
      .then((downloadURL)=>{
        setFormData({...FormData , avatar : downloadURL});
      });
    }
    );
  }
  const fileRef = useRef(null)
  const HandleChange =(e)=>{
    setFormData({...FormData ,[e.target.id] : e.target.value})
  }
  const HandleSubmit= async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(FormData)
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  const handleDeleteUser = async ()=>{
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE'
      })
      const data = await res.json()
      if(data.success===false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
    <form onSubmit={HandleSubmit} className='flex flex-col gap-4'>
      <input onChange={(e)=>setFile(e.target.files[0])}
      type="file" ref = {fileRef} accept='image/*' hidden/>
      <img onClick={()=>fileRef.current.click()}
        src={FormData.avatar || currentUser.avatar}
        alt='profile'
        className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
      />
      <p className='text-sm self-center'>
        {fileUploadError ? (
          <span className='text-red-700'>Error Image Upload 
          (image must be less then 2mb)</span> 
          ) :  FilePer>0 && FilePer<100 ? (
          <span className='text-slate-700'>
            {`Uploading ${FilePer} %`}
          </span> )
          : FilePer ===100 ? (
          <span className='text-green-700'>
            Image Successfully Uploaded!
          </span> )
          : ("")
        }
      </p>
      <input
        type='text'
        placeholder='username'
        id='username'
        defaultValue={currentUser.username}
        onChange={HandleChange}
        className='border p-3 rounded-lg'
      />
      <input
        type='email'
        placeholder='email'
        id='email'
        defaultValue={currentUser.email}
        onChange={HandleChange}
        className='border p-3 rounded-lg'
      />
      <input
        type='password'
        placeholder='password'
        id='password'
        onChange={HandleChange}
        className='border p-3 rounded-lg'
      />
      <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
        {loading ? 'Loading...':'Update'}
      </button>
    </form>
    <div className='flex justify-between mt-5'>
      <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>
        Delete account
      </span>
      <span  className='text-red-700 cursor-pointer'>
        Sign out
      </span>
    </div>
    <p className='text-red-700 mt-5'>{error ? error :''}</p>
    <p className='text-green-700 mt-5'>{UpdateSuccess ? 'Profile is Updated Successfully!' :''}</p>
  </div>
  )
}

export default Profile