import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import useAuth from "../hook/useAuth"
import NavDesktop from "./NavDesktop"
import NavMobile from "./NavMobile"

const Header = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated")
  const isAdmin = localStorage.getItem("isAdmin")

  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <header className="border-bottom border-1 d-flex justify-content-between align-items-center gap-4 px-3">
      <Link
        to="/"
        className="site-title d-flex align-items-center p-1 h-100 text-decoration-none text-light"
      >
        Streamy
      </Link>
      <NavDesktop isAuthenticated={isAuthenticated} isAdmin={isAdmin} handleLogout={handleLogout} />
      <NavMobile isAuthenticated={isAuthenticated} isAdmin={isAdmin} handleLogout={handleLogout} />
    </header>
  )
}

export default Header
