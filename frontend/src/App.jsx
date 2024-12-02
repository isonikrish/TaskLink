import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from "react-router-dom"
import './App.css'
import Auth from './pages/Auth'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Auth />}/> {/*login signup*/}
        <Route path='/profile' />
        <Route path='/dashboard' />
        <Route path='/dashboard/tasks' />
        <Route path='/dashboard/calendar' />

      </Routes>
      <Toaster />
    </div>
  )
}

export default App