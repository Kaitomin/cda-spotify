import { Routes, Route } from 'react-router-dom'
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

      {/* CLIENT and ADMIN only */}
      <Route path="/playlists" element={<RequireAuth><MyPlaylist/></RequireAuth>} />
      <Route path="/account" element={<RequireAuth><Account/></RequireAuth>} />
      <Route path="/playlist/:playlistId" element={<RequireAuth><DetailedPlaylist/></RequireAuth>} />
      <Route path="/playlist/:playlistId/music/:musicIndex" element={<RequireAuth><MusicDetails/></RequireAuth>} />

      {/* ADMIN only */}
      <Route path="/new-music" element={<RequireAuthAdmin><FormMusic/></RequireAuthAdmin>} />
      <Route path="/update-music/:musicId" element={<RequireAuthAdmin><FormMusic/></RequireAuthAdmin>} />
      <Route path="/dashboard" element={<RequireAuthAdmin><Dashboard/></RequireAuthAdmin>} />
  
      {/* Fallback route */}
      <Route path="*" render={() => <Redirect to="/" />} /> 
    </Routes>
  )
}

export default index