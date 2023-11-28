import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { signInFailure,signInStart,signInSuccess } from '../redux/user/userSlice'
import OAuth from '../Components/Oauth'

const SignIn = () => {
  const [formData, setformData] = useState({});
  const {loading,error} = useSelector((state)=>state.user);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleChange= (e)=>{
    setformData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };
  const handleSubmit =async (e)=>{
    e.preventDefault();
    dispatch(signInStart());
    try {
    const res = await fetch('/api/auth/signin',{
      method :'POST',
      headers:{
        'Content-Type' :"application/json",
      },    
      body : JSON.stringify(formData)
    });
    const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (err) {
        dispatch(signInFailure(err.message))
    }
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
         <input type="email" placeholder='Email' id='email' onChange={handleChange} className='border
        p-3 rounded-lg'/> 
         <input type="password" placeholder='Password' id='password' onChange={handleChange} className=' border
        p-3 rounded-lg'/>
        <button disabled={loading} className='bg-slate-700 rounded-md text-white p-3 
        hover:opacity-95 disabled:opacity-85 uppercase'>{loading?"Loading...":'Sign in'}</button>
        <OAuth />
      </form>
      <div className='flex mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'} className='text-blue-700'>sign up</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn