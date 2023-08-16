import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import NavBar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import Account from './pages/Account'
import Home from './pages/Home'
import MyPlaylist from './pages/MyPlaylist'
import DetailedPlaylist from './pages/DetailedPlaylist'
import  Search  from './pages/Search'

function App() {
  return (
    <>
      <NavBar/>
      {/* <Search/> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
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
