import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between max-w-6xl items-center mx-auto p-3'>
      <Link to='/'>
      <h1 className="font-bold text-sm sm:text-[2vw]  flex flex-wrap">
        <span className="text-slate-400">Estate</span>
        <span className="text-slate-700">Ease</span>
      </h1>
      </Link>
      <form className='flex'>
        <input type="text" placeholder='search...' className='bg-slate-100 rounded-lg p-3 border-none outline-none w-[40vw] sm:w-[24vw]' />
        
      </form>
      <ul className='flex gap-4 font-semibold cursor-pointer'>
        <Link to='/'>
        <li className='hidden sm:inline text-slate-600 hover:underline'>Home</li>
        
        </Link>
        <Link to='/about'>
        
        <li className='hidden sm:inline text-slate-600 hover:underline'>About</li>
        </Link>
        <Link to='/signin'>
        
        <li className='text-slate-600 hover:underline'>Signin</li>
        </Link>
      </ul>
      </div>
      
    </header>
  )
}

export default Header
