import React from 'react'
import Landing from './components/Landing'
import Login from './components/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Pricing from './components/Pricing'
import Docs from './components/Docs'
import Features from './components/Features'
import Home from './components/Home'
import ProjectDetails from './components/ProjectDetails'
import AccountSettings from './components/AccountSettings'
import Logout from './components/logout'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/price' element={<Pricing />}></Route>
        <Route path='/docs' element={<Docs />}></Route>
        <Route path='/features' element={<Features />}></Route>
        <Route path="/project/:id" element={<ProjectDetails />}></Route>
        <Route path="/settings" element={<AccountSettings />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
