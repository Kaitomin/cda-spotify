import { Suspense, lazy } from "react"
import { Routes, Route, Navigate } from "react-router-dom"

const Home = lazy(() => import("../pages/Home"))
const MusicForm = lazy(() => import("../components/MusicForm"))
const Account = lazy(() => import("../pages/Account"))
const Playlists = lazy(() => import("../pages/Playlists"))
const Search = lazy(() => import("../pages/Search"))
const Dashboard = lazy(() => import("../pages/Dashboard"))
const MusicDetails = lazy(() => import("../pages/MusicDetails"))
const Register = lazy(() => import("../pages/Register"))
const Login = lazy(() => import("../pages/Login"))
const AboutUs = lazy(() => import("../pages/AboutUs"))
const Contact = lazy(() => import("../pages/Contact"))
const RequireAuth = lazy(() => import("./RequireAuth"))
const RequireAuthAdmin = lazy(() => import("./RequireAuthAdmin"))
const PlaylistDetails = lazy(() => import("../pages/PlaylistDetails"))

import Loader from "../components/Loader"
import Page404 from "../pages/Page404"

const index = () => {
  return (
    <Routes>
      {/* No restrictions */}
      <Route
        path="/"
        element={
          <Suspense fallback={<>...</>}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path="/search"
        element={
          <Suspense fallback={<>...</>}>
            <Search />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense fallback={<>...</>}>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<>...</>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/music/:musicId"
        element={
          <Suspense fallback={<>...</>}>
            <MusicDetails key={"musicId"} />
          </Suspense>
        }
      />
      <Route
        path="/about-us"
        element={
          <Suspense fallback={<>...</>}>
            <AboutUs />
          </Suspense>
        }
      />
      <Route
        path="/contact"
        element={
          <Suspense fallback={<>...</>}>
            <Contact />
          </Suspense>
        }
      />

      {/* CLIENT and ADMIN only */}
      <Route
        path="/playlists"
        element={
          <Suspense fallback={<>...</>}>
            <RequireAuth>
              <Playlists />
            </RequireAuth>
          </Suspense>
        }
      />
      <Route
        path="/account"
        element={
          <Suspense fallback={<>...</>}>
            <RequireAuth>
              <Account />
            </RequireAuth>
          </Suspense>
        }
      />
      <Route
        path="/playlist/:playlistId"
        element={
          <Suspense fallback={<>...</>}>
            <RequireAuth>
              <PlaylistDetails />
            </RequireAuth>
          </Suspense>
        }
      />
      <Route
        path="/playlist/:playlistId/music/:musicIndex"
        element={
          <Suspense fallback={<>...</>}>
            <RequireAuth>
              <MusicDetails key={"playlistId"} />
            </RequireAuth>
          </Suspense>
        }
      />

      {/* ADMIN only */}
      <Route
        path="/new-music"
        element={
          <Suspense fallback={<>...</>}>
            <RequireAuthAdmin>
              <MusicForm />
            </RequireAuthAdmin>
          </Suspense>
        }
      />
      <Route
        path="/update-music/:musicId"
        element={
          <Suspense fallback={<>...</>}>
            <RequireAuthAdmin>
              <MusicForm />
            </RequireAuthAdmin>
          </Suspense>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Suspense fallback={<>...</>}>
            <RequireAuthAdmin>
              <Dashboard />
            </RequireAuthAdmin>
          </Suspense>
        }
      />

      {/* Fallback route */}
      <Route path="/404-notfound" element={<Page404 />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default index
