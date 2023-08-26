import { Routes, Route, Navigate } from 'react-router-dom'
import FormMusic from '../components/FormMusic'
import Account from '../pages/Account'
import Home from '../pages/Home'
import MyPlaylist from '../pages/MyPlaylist'
import DetailedPlaylist from '../pages/DetailedPlaylist'
import Search  from '../pages/Search'
import Dashboard from '../pages/Dashboard'
import MusicDetails from '../pages/MusicDetails'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AboutUs from '../pages/AboutUs'
import Contact from '../pages/Contact'
import RequireAuth from '../utils/RequireAuth'
import RequireAuthAdmin from '../utils/RequireAuthAdmin'

const index = () => {
  return (
    <Routes>
      {/* No restrictions */}
      <Route path="/" element={<Home/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/music/:musicId" element={<MusicDetails/>} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact" element={<Contact/>} />

      {/* CLIENT and ADMIN only */}
      <Route path="/playlists" element={<RequireAuth><MyPlaylist/></RequireAuth>} />
      <Route path="/account" element={<RequireAuth><Account/></RequireAuth>} />
      <Route path="/playlist/:playlistId" element={<RequireAuth><DetailedPlaylist/></RequireAuth>} />
      <Route path="/playlist/:playlistId/music/:musicIndex" element={<RequireAuth><MusicDetails/></RequireAuth>} />

      {/* <Route path="/playlists" element={<MyPlaylist/>} />
      <Route path="/account" element={<Account/> }/>
      <Route path="/playlist/:playlistId" element={<DetailedPlaylist/>} />
      <Route path="/playlist/:playlistId/music/:musicIndex" element={<MusicDetails/>} /> */}

      {/* ADMIN only */}
      <Route path="/new-music" element={<RequireAuthAdmin><FormMusic/></RequireAuthAdmin>} />
      <Route path="/update-music/:musicId" element={<RequireAuthAdmin><FormMusic/></RequireAuthAdmin>} />
      <Route path="/dashboard" element={<RequireAuthAdmin><Dashboard/></RequireAuthAdmin>} />

      {/* <Route path="/new-music" element={<FormMusic/>} />
      <Route path="/update-music/:musicId" element={<FormMusic/>} />
      <Route path="/dashboard" element={<Dashboard/>} /> */}
  
      {/* Fallback route */}
      <Route path="*" element={<Navigate replace to='/' />} />
      
    </Routes>
  )
}

export default index