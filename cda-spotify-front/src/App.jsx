import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import NavBar from './components/navbar'
import MusicPlayer from './components/MusicPlayer'
import Slider from './components/Slider'
import Account from './pages/Account'
import Searching from './pages/Searching'
import Home from './pages/Home'
import Playlist from './pages/Playlist'
import MyPlaylist from './pages/MyPlaylist'
import DetailedPlaylist from './pages/DetailedPlaylist'



function App() {
  
  return (
    <>
    <NavBar/>
    <MusicPlayer/>
    <Slider/>
    <MyPlaylist/>
    <DetailedPlaylist/>

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
