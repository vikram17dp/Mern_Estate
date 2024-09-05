import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useState} from 'react'

function Signup() {
  const [formData,setFormdata] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e)=>{
      setFormdata({...formData,[e.target.id]:e.target.value})
  }
  const onSubmitChange = async(e)=>{
    e.preventDefault();
    setError(null);
    setLoading(true)
      try {
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/signin');
      } catch (error) {
        setLoading(false);
        setError(error.message)
      }
      
  }

  
  
  return (
    <div className='p-3 mx-auto max-w-full'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-4 sm:w-1/3 sm:mx-auto' onSubmit={onSubmitChange}>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' onChange={handleChange}/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 p-3 rounded-lg text-white font-semibold hover:opacity-95 disabled:opacity-85'>
          {loading ? "Loading...":'Sign Up'}
        </button>
        <div className='flex gap-3 ml-2'>
        <p className='font-medium'>Have an account</p>
        <Link to={"/signin"}>
        <span className='text-blue-600'>Signin</span>
        </Link>
        </div>
        {error && <p className='text-red-500  mx-auto'>{error}</p>}
      </form>
    </div>
  )
}

export default Signup
