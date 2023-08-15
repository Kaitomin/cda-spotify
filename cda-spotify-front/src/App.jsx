import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import NavBar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import Account from './pages/Account'
import Searching from './pages/Searching'
import Home from './pages/Home'
import MyPlaylist from './pages/MyPlaylist'
import DetailedPlaylist from './pages/DetailedPlaylist'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Searching/>} />
        <Route path="/playlists" element={<MyPlaylist/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/playlist/:playlistId" element={<DetailedPlaylist/>} />
        <Route path="/music/:musicId" element={<MusicPlayer/>} />
        <Route path="/playlist/:playlistId/music/:musicIndex" element={<MusicPlayer/>} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Routes>
    </>
  )
}

export default App
