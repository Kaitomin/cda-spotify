import { Routes, Route, Navigate } from 'react-router-dom'
// import FormMusic from '../components/FormMusic'
// import Account from '../pages/Account'
// import Home from '../pages/Home'
// import MyPlaylist from '../pages/MyPlaylist'
// import Search  from '../pages/Search'
// import Dashboard from '../pages/Dashboard'
// import MusicDetails from '../pages/MusicDetails'
// import Register from '../pages/Register'
// import Login from '../pages/Login'
// import AboutUs from '../pages/AboutUs'
// import Contact from '../pages/Contact'
// import RequireAuth from '../utils/RequireAuth'
// import RequireAuthAdmin from '../utils/RequireAuthAdmin'
// import MyDetailedPlaylist from '../pages/MyDetailedPlaylist'
import { Suspense, lazy } from 'react'
const Home = lazy(() => import('../pages/Home'))
const FormMusic = lazy(() => import('../components/FormMusic'))
const Account = lazy(() => import('../pages/Account'))
const MyPlaylist = lazy(() => import('../pages/MyPlaylist'))
const Search = lazy(() => import('../pages/Search'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const MusicDetails = lazy(() => import('../pages/MusicDetails'))
const Register = lazy(() => import('../pages/Register'))
const Login = lazy(() => import('../pages/Login'))
const AboutUs = lazy(() => import('../pages/AboutUs'))
const Contact = lazy(() => import('../pages/Contact'))
const RequireAuth = lazy(() => import('../utils/RequireAuth'))
const RequireAuthAdmin = lazy(() => import('../utils/RequireAuthAdmin'))
const MyDetailedPlaylist = lazy(() => import('../pages/MyDetailedPlaylist'))

const index = () => {
  return (
    <Routes>
      {/* No restrictions */}
      <Route path="/" element={<Suspense fallback={<>...</>}><Home/></Suspense>} />
      <Route path="/search" element={<Suspense fallback={<>...</>}><Search/></Suspense>} />
      <Route path="/register" element={<Suspense fallback={<>...</>}><Register/></Suspense>} />
      <Route path="/login" element={<Suspense fallback={<>...</>}><Login/></Suspense>} />
      <Route path="/music/:musicId" element={<Suspense fallback={<>...</>}><MusicDetails key={"musicId"} /></Suspense>} />
      <Route path="/about-us" element={<Suspense fallback={<>...</>}><AboutUs /></Suspense>} />
      <Route path="/contact" element={<Suspense fallback={<>...</>}><Contact/></Suspense>} />

      {/* CLIENT and ADMIN only */}
      <Route path="/playlists" element={<Suspense fallback={<>...</>}><RequireAuth><MyPlaylist/></RequireAuth></Suspense>} />
      <Route path="/account" element={<Suspense fallback={<>...</>}><RequireAuth><Account/></RequireAuth></Suspense>} />
      <Route path="/playlist/:playlistId" element={<Suspense fallback={<>...</>}><RequireAuth><MyDetailedPlaylist/></RequireAuth></Suspense>} />
      <Route path="/playlist/:playlistId/music/:musicIndex" element={<Suspense fallback={<>...</>}><RequireAuth><MusicDetails key={"playlistId"}/></RequireAuth></Suspense>} />

      {/* ADMIN only */}
      <Route path="/new-music" element={<Suspense fallback={<>...</>}><RequireAuthAdmin><FormMusic/></RequireAuthAdmin></Suspense>} />
      <Route path="/update-music/:musicId" element={<Suspense fallback={<>...</>}><RequireAuthAdmin><FormMusic/></RequireAuthAdmin></Suspense>} />
      <Route path="/dashboard" element={<Suspense fallback={<>...</>}><RequireAuthAdmin><Dashboard/></RequireAuthAdmin></Suspense>} />
  
      {/* Fallback route */}
      <Route path="*" element={<Navigate replace to='/' />} />
      
    </Routes>
  )
}

export default index