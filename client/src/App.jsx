import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import About from './pages/About'
import Header from './compnents/Header'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Privateroute from './compnents/Privateroute'
import CreateListing from './pages/CreateListing'
import UpdateLsitning from './pages/UpdateLsitning'
import Listing from './pages/Listing'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/listing/:listingId' element={<Listing/>}/>
    <Route element={<Privateroute/>}>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/createListing' element={<CreateListing/>}/>
    <Route path='/updateListing/:listingId' element={<UpdateLsitning/>}/>

    </Route>

    </Routes>
    </BrowserRouter>
  )
}

export default App
