import { useState } from 'react';

import { Link, useNavigate } from "react-router-dom"
import useAuth from '../hook/useAuth'

const NavBar = () => {
  const { logout } = useAuth()
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
    <nav className="main-nav border-bottom border-1 d-flex justify-content-between gap-4 px-3">
      <Link to="/" className="site-title d-flex align-items-center p-1 h-100 text-decoration-none text-light">Streamy</Link>
      <ul className="d-none d-sm-flex p-0 m-0 align-items-center list-unstyled">
        <li className="px-3 h-100">
          <Link to="/search" className="d-flex align-items-center p-1 h-100 text-decoration-none text-light"><i className="fa-solid fa-magnifying-glass"></i></Link>
        </li>
        { isAuthenticated &&
          <li className="px-3 h-100">
            <Link to="/playlists" className=" d-flex align-items-center p-1 h-100 text-decoration-none text-light">Playlists</Link>
          </li>
        }
        { isAuthenticated && isAdmin == 'true' &&
          <li className="d-none d-sm-block px-3 h-100">
            <Link to="/dashboard" className=" d-flex align-items-center p-1 h-100 text-decoration-none text-light">Dashboard</Link>
          </li>
        }
        { !isAuthenticated &&
          <>
            <li className="px-3 h-100">
              <Link to="/register" className=" d-flex align-items-center p-1 h-100 text-decoration-none text-light">S'inscrire</Link>
            </li>
            <li className="px-3 h-100">
              <Link to="/login" className=" d-flex align-items-center p-1 h-100 text-decoration-none text-light">Connexion</Link>
            </li>
          </>
        }
        { isAuthenticated && <li onClick={handleLogout} className="logout d-flex align-items-center px-3 h-100"><i className="fa-solid fa-right-from-bracket"></i></li>}
      </ul>
        
        
      {/* ---------- */}
      {/* Burger nav */}
      {/* ---------- */}
      <div className={`burger-blocker d-sm-none d-flex vw-100 vh-100 position-fixed top-0 start-0 ${showBurgerMenu ? "d-block" : "d-none"}`}></div> {/* Fake layer to block clicks outside of the menu */}
      <div className={`menu-burger-container d-sm-none d-flex align-items-center ${showBurgerMenu ? 'open-burger-menu' : 'position-relative'}`}>

        {/* Button to display menu */}
        <input id="menu-toggle" className="d-none" type="checkbox" readOnly checked={showBurgerMenu} onClick={handleShowBurger} />
        <label className='menu-button-container d-flex' htmlFor="menu-toggle">
          <div className='menu-button'></div>
        </label>

        {/* Menu */}
        { showBurgerMenu &&
          <ul className="menu-burger list-unstyled d-flex flex-column m-0 p-0 position-fixed start-0 w-100 h-100 align-items-center">
            <li className="w-100 d-flex align-items-center"><Link to="/about-us" onClick={handleShowBurger} className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none">A propos</Link></li>
            <li className="w-100 d-flex align-items-center"><Link to="/contact" onClick={handleShowBurger} className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none">Contact</Link></li>
            { isAuthenticated && (
              <>
                <li onClick={handleLogout} className="logout d-flex align-items-center w-100 justify-content-center">Déconnexion</li>
              </>
            )}
            
            { !isAuthenticated && (
              <>
                <li className="w-100 d-flex align-items-center"><Link onClick={handleShowBurger} to="/register" className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none">S'inscrire</Link></li>
                <li className="w-100 d-flex align-items-center"><Link onClick={handleShowBurger} to="/login" className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none">Connexion</Link></li>
              </>
            )}
          </ul>
        }
      </div>
    </nav>
  )
}

export default NavBar