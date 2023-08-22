import { Link, useNavigate } from "react-router-dom"
import useAuth from '../hook/useAuth'
import { useEffect } from 'react';

const NavBar = () => {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const isAdmin = localStorage.getItem('isAdmin')

  const handleLogout = () => {  
    logout()
    navigate("/")
  }

  return (
    <nav className="nav border-bottom border-1">
      <Link to="/" className="site-title">Streamy</Link>
      <ul>
        <li className="d-none d-sm-block">
          <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
        </li>
        { isAuthenticated &&
          <li>
            <Link to="/playlists">Mes Playlists</Link>
          </li>
        }
        
        {/* <li>
          <Link to="/account">Mon Compte</Link>
        </li> */}
        { isAuthenticated && isAdmin == 'true' &&
          <li className="d-none d-sm-block">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        }
        {!isAuthenticated &&
          <>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          </>
        }
        {isAuthenticated && <li onClick={handleLogout} className="logout d-flex align-items-center"><i className="fa-solid fa-right-from-bracket"></i></li>}
      </ul>
    </nav>
  )
}

export default NavBar