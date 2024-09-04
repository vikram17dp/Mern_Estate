import React from 'react'
import { Link } from 'react-router-dom'

function Signin() {
  return (
    <div className='p-3 mx-auto max-w-full'>
      <h1 className='text-3xl text-center my-7 font-semibold'>Sign In</h1>
      <form className='flex flex-col gap-4 sm:w-1/3 sm:mx-auto'>
        <input type="email" placeholder='email' className='border p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password' className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 p-3 rounded-lg text-white font-semibold hover:opacity-95 disabled:opacity-85'>Sign In</button>
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
