import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const SecondaryNav = () => {
  useAuth()
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const isAdmin = localStorage.getItem('isAdmin')

  return (
    <nav className='secondary-nav position-fixed bottom-0 w-100 border-top border-1 d-sm-none'>
      <ul className='d-flex justify-content-around m-0 list-unstyled'>
        <Link to="/" className='text-light'><i className="fa-solid fa-house"></i></Link>
        <Link to="/search" className='text-light'><i className="fa-solid fa-magnifying-glass"></i></Link>
        { isAuthenticated && <Link to='/playlists' className='text-light'><i className="fa-solid fa-list"></i></Link>}
        { isAuthenticated && isAdmin == "true" && <Link to='/dashboard' className='text-light'><i className="fa-solid fa-gauge"></i></Link>}
      </ul>
    </nav>
  )
}

export default SecondaryNav