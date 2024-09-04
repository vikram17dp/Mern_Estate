import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import About from './pages/About'
import Header from './compnents/Header'
import Signup from './pages/Signup'

function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='/signup' element={<Signup/>}/>

    </Routes>
    </BrowserRouter>
  )
}

export default App
