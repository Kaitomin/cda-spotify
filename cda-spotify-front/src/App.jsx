import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import NavBar from './components/navbar'
import Account from './pages/Account'
import Searching from './pages/Searching'
import Home from './pages/Home'
import Playlist from './pages/Playlist'


function App() {
  
  return (
    <>
    <NavBar/>


    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/searching" element={<Searching/>}/>
      <Route path="/playlist" element={<Playlist/>}/>
      <Route path="/account" element={<Account/>}/>
    </Routes>
    
    


    

    </>
  
  )
}

export default App
