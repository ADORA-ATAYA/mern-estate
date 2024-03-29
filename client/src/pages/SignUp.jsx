import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../Components/Oauth';

const SignUp = () => {
  const [formData, setformData] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
 const navigate = useNavigate()
  const handleChange= (e)=>{
    setformData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  // console.log(e.target.value)
  };
    const handleSubmit =async (e)=>{
      e.preventDefault();
      setloading(true)
      try {
      const res = await fetch('/api/auth/signup',{
        method :'POST',
        headers:{
          'Content-Type' :"application/json",
        },    
        body : JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        seterror(data.message)
        setloading(false)
        return
      }
      setloading(false);
      seterror(null);
      navigate('/sign-in')
  } catch (err) {
    seterror(err.message)
    setloading(false)
  }

    // console.log(data);
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" placeholder='Username' id='username' onChange={handleChange} className='border
        p-3 rounded-lg'/>
         <input type="email" placeholder='Email' id='email' onChange={handleChange} className='border
        p-3 rounded-lg'/> 
         <input type="password" placeholder='Password' id='password' onChange={handleChange} className=' border
        p-3 rounded-lg'/>
        <button disabled={loading} className='bg-slate-700 rounded-md text-white p-3 
        hover:opacity-95 disabled:opacity-85 uppercase'>{loading?"Loading...":'Sign Up'}</button>
        <OAuth />
      </form>
      <div className='flex mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'} className='text-blue-700'>sign in</Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
};

export default SignUp;