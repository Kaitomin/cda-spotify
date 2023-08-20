import { Link, useNavigate } from "react-router-dom"
import useAuth from '../hook/useAuth'

const NavBar = () => {
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

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
        <li>
          <Link to="/playlists">Mes Playlists</Link>
        </li>
        {/* <li>
          <Link to="/account">Mon Compte</Link>
        </li> */}
        <li className="d-none d-sm-block">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {!currentUser.id &&
          <>
            <li>
              <Link to="/register">S'inscrire</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          </>
        }
        {currentUser.id && <li onClick={handleLogout} className="logout"><i className="fa-solid fa-right-from-bracket"></i></li>}
      </ul>
    </nav>
  )
}

export default NavBar