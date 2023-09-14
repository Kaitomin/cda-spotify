import { useState, createContext, useContext } from "react"
import { useNavigate } from 'react-router-dom'

import AuthService from "../service/AuthService"
import jwtDecode from "jwt-decode"

const authContext = createContext()

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate()

  const checkCookie = roles => {
    AuthService.checkCookie()
      .then(res => {
        const token = jwtDecode(res.data)

        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('isAdmin', token.role === 'ADMIN')

        setCurrentUser({
          id: token.id,
          role: token.role
        })

        if (!roles.includes(token.role)) throw ({response: {data : 'Unauthorized'}})
      })
      .catch((e) => {
        // console.log(e.response.data)
        switch (e.response.data) {
          case 'Unauthorized':
            navigate('/')
            break
          case 'Cookie not found':
          case 'Invalid X-CSRF-TOKEN':
            setCurrentUser({})
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('csrf-token')
            navigate('/login')
            break
          default:
            navigate('/')
        }
      })
  }

  const register = ({ username, password }, recaptchaToken) => {
    AuthService.register({ username, password }, recaptchaToken)
      .then(() => navigate('/login'))
  }

  const login = ({ username, password }, recaptchaToken) => {
    AuthService.login({ username, password }, recaptchaToken)
      .then((res) => {
        const token = jwtDecode(res.data.token)

        setCurrentUser({
          id: token.id,
          role: token.role
        })

        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('csrf-token', token.csrfToken)
        localStorage.setItem('isAdmin', token.role === 'ADMIN')

        navigate('/')
      })
  }

  const logout = () => {
    AuthService.logout()
      .then(() => {
        setCurrentUser({})
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('csrf-token')
      })
  }
 
  return {
    currentUser,
    checkCookie,
    register,
    login,
    logout
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}