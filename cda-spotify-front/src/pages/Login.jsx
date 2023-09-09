import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import useAuth from "../hook/useAuth"

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [user, setUser] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    login({ username: user.username, password: user.password })
  }

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      navigate("/")
    }
  }, [])

  return (
    !(localStorage.getItem("isAuthenticated")) &&
    <div className="connection flex-grow-1">
      <h1>Se connecter</h1>
      <form onSubmit={handleLogin} className="d-flex flex-column w-50 m-auto">
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            className="w-100"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-100"
            onChange={handleChange}
          />
        </div>
        <button>Connexion</button>
      </form>
      <div className="d-flex justify-content-center">
        <Link to='/register'>Pas encore de compte ?</Link>
      </div>
    </div>
  )
}
export default Login
