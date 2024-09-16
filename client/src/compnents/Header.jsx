import React, { useEffect, useState }  from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {FaSearch} from 'react-icons/fa'

function Header() {
  const { currentUser } = useSelector(state => state.user);
  const [searchTerm,setSearchTerm] = useState('');
  const navigate = useNavigate()
  const location = useLocation();
  

  const handleSubmit = (e)=>{
      e.preventDefault();
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('searchTerm',searchTerm);
      const searchQuery = urlParams.toString();
      navigate(`/search?${searchQuery}`)
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const serachtermFromUrl = urlParams.get('searchTerm');
    if(serachtermFromUrl){
      setSearchTerm(serachtermFromUrl)
    }
  },[location])
  
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between max-w-6xl items-center mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-[2vw]  flex flex-wrap">
            <span className="text-slate-400">Estate</span>
            <span className="text-slate-700">Ease</span>
          </h1>
        </Link>
        <form className="flex relative items-center " onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="search..."
            value={searchTerm}
            onChange={(e)=>setSearchTerm(e.target.value)}
            className="bg-slate-100 rounded-lg p-3 border-none outline-none w-[40vw] sm:w-[24vw]"
          />
          <button className='items-center mb-4'>
          <FaSearch className='text-slate-600 absolute left-[22vw] '/>

          </button>
        </form>
        <ul className="flex gap-4 font-semibold cursor-pointer">
          <Link to="/">
            <li className="hidden sm:inline text-slate-600 hover:underline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-600 hover:underline">
              About
            </li>
          </Link>
          <Link to={currentUser ? '/profile' : '/signin' }>
                {
                  currentUser ? (<img className="rounded-full h-8 w-8 object-cover" alt="profile" src={currentUser.avatar}/>) :(
                    <li className="text-slate-700 hover:underline">Sign in</li>
                  )
                }
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
