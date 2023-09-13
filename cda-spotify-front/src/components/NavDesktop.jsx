import { Link } from "react-router-dom"
import PropTypes from 'prop-types'

const NavDesktop = ({ isAuthenticated, isAdmin, handleLogout }) => {

  return (
    <nav className="nav-desktop">
      <ul className="d-none d-sm-flex p-0 m-0 align-items-center list-unstyled">
        <li className="h-100">
          <Link
            to="/search"
            className="d-flex align-items-center px-3 text-decoration-none text-light"
          >
            <i className="d-flex align-items-center justify-content-center fa-solid fa-magnifying-glass"></i>
          </Link>
        </li>
        {isAuthenticated && (
          <li className="h-100">
            <Link
              to="/playlists"
              className="d-flex align-items-center px-3 text-decoration-none text-light"
            >
              Playlists
            </Link>
          </li>
        )}
        {isAuthenticated && isAdmin == "true" && (
          <li className="d-none d-sm-block h-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center px-3 text-decoration-none text-light"
            >
              Dashboard
            </Link>
          </li>
        )}
        {!isAuthenticated && (
          <>
            <li className="h-100">
              <Link
                to="/register"
                className="d-flex align-items-center px-3 text-decoration-none text-light"
              >
                S&apos;inscrire
              </Link>
            </li>
            <li className="h-100">
              <Link
                to="/login"
                className="d-flex align-items-center px-3 text-decoration-none text-light"
              >
                Connexion
              </Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <li
            onClick={handleLogout}
            className="logout d-flex align-items-center px-3 h-100"
          >
            <button className="bg-transparent border-0">
              <i className="d-flex align-items-center justify-content-center fa-solid fa-right-from-bracket text-white"></i>
            </button>
          </li>
        )}
      </ul>
    </nav>
  )
}

NavDesktop.propTypes = {
  isAuthenticated: PropTypes.string,
  isAdmin: PropTypes.string,
  handleLogout: PropTypes.func
}

export default NavDesktop
