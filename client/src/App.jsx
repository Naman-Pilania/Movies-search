import React from 'react'
import {Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import Logout from './pages/Logout'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path = '/' element={< Home/>}/>
        <Route path = '/login' element={< Login/>}/>
        <Route path = '/register' element={< Register/>}/>
        <Route path = '/logout' element={< Logout/>}/>
      </Routes>
      <Footer/>

    </div>
  )
}

export default App