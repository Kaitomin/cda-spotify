import { Link, useNavigate } from "react-router-dom"
import useAuth from '../hook/useAuth'
import { useState } from 'react';

const NavBar = () => {
  const { logout, currentUser } = useAuth()
  const navigate = useNavigate()
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const isAdmin = localStorage.getItem('isAdmin')
  const [showBurgerMenu, setShowBurgerMenu] = useState(false)

  const handleLogout = () => {
    handleShowBurger()
    logout()
    navigate("/")
  }

  const handleShowBurger = () => {
    setShowBurgerMenu(!showBurgerMenu)
  }

  return (
    <nav className="nav border-bottom border-1">
      <Link to="/" className="site-title">Streamy</Link>
      <ul className="d-none d-sm-flex p-0 m-0 align-items-center list-unstyled">
        <li>
          <Link to="/search"><i className="fa-solid fa-magnifying-glass"></i></Link>
        </li>
        { isAuthenticated &&
          <li>
            <Link to="/playlists">Mes Playlists</Link>
          </li>
        }
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
        
        
      {/* ---------- */}
      {/* Burger nav */}
      {/* ---------- */}
      <div className={`burger-blocker d-sm-none d-flex ${showBurgerMenu ? "d-block" : "d-none"}`}></div> {/* Fake layer to block clicks outside of the menu */}
      <div className="menu-burger-container d-sm-none d-flex">

        {/* Button to display menu */}
        <input id="menu-toggle" type="checkbox" readOnly checked={showBurgerMenu} onClick={handleShowBurger} />
        <label className='menu-button-container' htmlFor="menu-toggle">
          <div className='menu-button'></div>
        </label>

        {/* Menu */}
        { showBurgerMenu &&
          <ul className="menu-burger list-unstyled d-flex flex-column">
            <li><Link to="/about-us" onClick={handleShowBurger} className="w-100 justify-content-center">A propos</Link></li>
            <li><Link to="/contact" onClick={handleShowBurger} className="w-100 justify-content-center">Contact</Link></li>
            { isAuthenticated && (
              <>
                <li onClick={handleLogout} className="logout d-flex align-items-center">Déconnexion</li>
              </>
            )}
            
            { !isAuthenticated && (
              <>
                <li className="w-100"><Link onClick={handleShowBurger} to="/register" className="w-100 justify-content-center">S'inscrire</Link></li>
                <li className="w-100"><Link onClick={handleShowBurger} to="/login" className="w-100 justify-content-center">Connexion</Link></li>
              </>
            )}
          </ul>
        }
      </div>
    </nav>
  )
}

export default NavBar