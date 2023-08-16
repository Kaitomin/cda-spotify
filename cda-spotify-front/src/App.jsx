import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './style.css'
import NavBar from './components/Navbar'
import MusicPlayer from './components/MusicPlayer'
import FormMusic from './components/FormMusic'
import Account from './pages/Account'
import Home from './pages/Home'
import MyPlaylist from './pages/MyPlaylist'
import DetailedPlaylist from './pages/DetailedPlaylist'
import  Search  from './pages/Search'
import Dashboard from './pages/Dashboard'

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
        <Route path="/new-music" element={<FormMusic/>} />
        <Route path="/update-music/:musicId" element={<FormMusic/>} />
        <Route path="/playlist/:playlistId" element={<DetailedPlaylist/>} />
        <Route path="/music/:musicId" element={<MusicPlayer/>} />
        <Route path="/playlist/:playlistId/music/:musicIndex" element={<MusicPlayer/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="*" render={() => <Redirect to="/" />} />
      </Routes>
    </>
  )
}

export default App
