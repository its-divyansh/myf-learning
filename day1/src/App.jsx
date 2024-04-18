import { useState } from 'react'
import './App.css'
import Home from './components/Home.jsx'
import Button from './components/Button.jsx'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import User from './components/User.jsx'
function App() {

  // localStorage.setItem("dev",JSON.stringify([]));
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/user' element={<User/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
