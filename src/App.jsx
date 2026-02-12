import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import Landing from './pages/landing'
import Access from './pages/access'
import Login from './pages/login'
import Signup from './pages/signup'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/access" element={<Access />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  )
}
