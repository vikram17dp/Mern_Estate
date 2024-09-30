import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { sigInFailure,sigInSuccess,sigInstart } from '../redux/user/userSlice';
import OAuth from '../compnents/OAuth';

function Signin() {
  const [formData,setFormdata] = useState({});
  const {loading,error} = useSelector(state=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useSelector(state => state.user);
  


  const handlechange = (e)=>{
    setFormdata({...formData,[e.target.id]:e.target.value})
  }
  const handlesubmit = async (e)=>{
    e.preventDefault();
    try {
     dispatch(sigInstart())
     const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    
      const data = await res.json();
      if(data.success == false){
        dispatch(sigInFailure(data.message))
        return
      } 
      if(res.ok){
        dispatch(sigInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(sigInFailure(error.message))
    }
    
  }
  return (
    <div className='p-3 mx-auto max-w-full'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Sign In</h1>
      <form className='flex flex-col gap-4 sm:w-1/3 sm:mx-auto' onSubmit={handlesubmit}>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handlechange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handlechange}/>
        <button className='bg-slate-700 p-3 rounded-lg text-white font-semibold hover:opacity-95 disabled:opacity-85' disabled={loading}>
          {loading ? 'Loading..' : 'Sign In'}
        </button>
        <OAuth/>
        <div className='flex gap-3'>
        <p className='font-medium'>Have an account</p>
        <Link to={"/signup"}>
        <span className='text-blue-600'>Signup</span>

        </Link>
        </div>
        {
         error && <div className=" text-red-400 mt-5 text-center">
          
          {error}
                    
          </div>
       }


      </form>
      
    </div>
  )
}

export default Signin
