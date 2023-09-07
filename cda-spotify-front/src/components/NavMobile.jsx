import { useState } from "react"
import PropTypes from 'prop-types'

import { Link } from "react-router-dom"

const NavMobile = ({ isAuthenticated, handleLogout }) => {
  const [showBurgerMenu, setShowBurgerMenu] = useState(false)

  const onLogout = () => {
    handleShowBurger()
    handleLogout()
  }

  const handleShowBurger = () => {
    setShowBurgerMenu(!showBurgerMenu)
  }

  return (
    <nav className="d-sm-none d-flex">
      <div
        className={`burger-blocker d-sm-none d-flex vw-100 vh-100 position-fixed top-0 start-0 ${
          showBurgerMenu ? "d-block" : "d-none"
        }`}
      ></div>{" "}
      {/* Fake layer to block clicks outside of the menu */}
      <div
        className={`menu-burger-container d-sm-none d-flex align-items-center ${
          showBurgerMenu ? "open-burger-menu" : "position-relative"
        }`}
      >
        {/* Button to display menu */}
        <input
          id="menu-toggle"
          className="d-none"
          type="checkbox"
          readOnly
          checked={showBurgerMenu}
          onClick={handleShowBurger}
        />
        <label className="menu-button-container d-flex" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>

        {/* Menu */}
        {showBurgerMenu && (
          <ul className="menu-burger list-unstyled d-flex flex-column m-0 p-0 position-fixed start-0 w-100 h-100 align-items-center">
            <li className="w-100 d-flex align-items-center">
              <Link
                to="/about-us"
                onClick={handleShowBurger}
                className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none"
              >
                A propos
              </Link>
            </li>
            <li className="w-100 d-flex align-items-center">
              <Link
                to="/contact"
                onClick={handleShowBurger}
                className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none"
              >
                Contact
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li
                  onClick={onLogout}
                  className="logout d-flex align-items-center w-100 justify-content-center"
                >
                  <button className="bg-transparent border-0 text-white">
                    Déconnexion
                  </button>
                </li>
              </>
            )}

            {!isAuthenticated && (
              <>
                <li className="w-100 d-flex align-items-center">
                  <Link
                    onClick={handleShowBurger}
                    to="/register"
                    className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none"
                  >
                    S&apos;inscrire
                  </Link>
                </li>
                <li className="w-100 d-flex align-items-center">
                  <Link
                    onClick={handleShowBurger}
                    to="/login"
                    className="d-flex justify-content-center align-items-center m-0 w-100 px-1 text-light text-decoration-none"
                  >
                    Connexion
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  )
}

NavMobile.propTypes = {
  isAuthenticated: PropTypes.string,
  handleLogout: PropTypes.func
}

export default NavMobile
