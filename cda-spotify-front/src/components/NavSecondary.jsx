import { Link } from 'react-router-dom'

import useAuth from '../hook/useAuth'

const NavSecondary = () => {
  useAuth()
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const isAdmin = localStorage.getItem('isAdmin')

  return (
    <nav className='secondary-nav position-fixed bottom-0 w-100 border-top border-1 d-sm-none'>
      <ul className='d-flex justify-content-around m-0 list-unstyled'>
        <li><Link to="/" className='text-light' aria-label='Homepage'><i className="fa-solid fa-house"></i></Link></li>
        <li><Link to="/search" className='text-light' aria-label='Search a music by title or artist'><i className="fa-solid fa-magnifying-glass"></i></Link></li>
        { isAuthenticated && <li><Link to='/playlists' className='text-light' aria-label='Go to my playlists'><i className="fa-solid fa-list"></i></Link></li>}
        { isAuthenticated && isAdmin == "true" && <li><Link to='/dashboard' className='text-light' aria-label='Dashboard'><i className="fa-solid fa-gauge"></i></Link></li>}
      </ul>
    </nav>
  )
}

export default NavSecondary