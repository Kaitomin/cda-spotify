import { useState, createContext, useContext } from "react"
import { useNavigate } from 'react-router-dom'

import AuthService from "../service/AuthService"
import jwtDecode from "jwt-decode"

const authContext = createContext()

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [authError, setAuthError] = useState()
  const [loginLoading, setLoginLoading] = useState(false)
  const [isCookieBannerHidden, setIsCookieBannerHidden] = useState()
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
      .then(() => {  
        setAuthError('')
        navigate('/login')
      })
      .catch(() => {
        setAuthError('Cet identifiant existe déjà')
        setTimeout(() => setAuthError(''), 1500)
      })
  }

  const login = ({ username, password }, recaptchaToken) => {
    setLoginLoading(true)
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
        setLoginLoading(false)
        setAuthError('')
        
        navigate('/')
      })
      .catch(() => {
        setLoginLoading(false)
        setAuthError('Identifiants incorrects')
        setTimeout(() => setAuthError(''), 1500)
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

  const hideCookieBanner = (value) => {
    setIsCookieBannerHidden(value)
  }
 
  return {
    currentUser,
    loginLoading,
    authError,
    checkCookie,
    register,
    login,
    logout,
    hideCookieBanner,
    isCookieBannerHidden
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}