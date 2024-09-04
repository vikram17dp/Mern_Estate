import React from 'react'
import { Link } from 'react-router-dom'
import Signin from './Signin'

function Signup() {
  return (
    <div className='p-3 mx-auto max-w-full'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Sign Up</h1>
      <form className='flex flex-col gap-4 sm:w-1/3 sm:mx-auto'>
        <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 p-3 rounded-lg text-white font-semibold hover:opacity-95 disabled:opacity-85'>Sign Up</button>
        <div className='flex gap-3'>
        <p className='font-medium'>Have an account</p>
        <Link to={"/signin"}>
        <span className='text-blue-600'>Signin</span>

        </Link>
        </div>
      </form>
    </div>
  )
}

export default Signup
