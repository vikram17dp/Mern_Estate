import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Signin() {
  const [formData,setFormdata] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handlechange = (e)=>{
    setFormdata({...formData,[e.target.id]:e.target.value})
  }
  const handlesubmit = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.join();
      if(data.success == false){
        setError(data.message);
        setLoading(false)
        return
      } 
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
    navigate('/')
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
        <div className='flex gap-3'>
        <p className='font-medium'>Have an account</p>
        <Link to={"/signup"}>
        <span className='text-blue-600'>Signup</span>

        </Link>
        </div>


      </form>
      
    </div>
  )
}

export default Signin
