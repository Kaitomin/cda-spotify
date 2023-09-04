import { useState, createContext, useContext } from "react";
import AuthService from "../service/AuthService"
import jwtDecode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const authContext = createContext()

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({})
  const navigate = useNavigate()

  const checkIfCookieExists = roles => {
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
        switch (e.response.data) {
          case 'Unauthorized':
            navigate('/')
            break
          // JWT expired
          case 'Cookie not found':
            localStorage.removeItem('isAuthenticated')
            localStorage.removeItem('isAdmin')
            navigate('/login')
            break
          default:
            navigate('/')
        }
      })
  } 
 
  return {
    currentUser,
    checkCookie(roles) {
      checkIfCookieExists(roles)
    },
    register({ username, password }) {
      AuthService.register({ username, password })
        .then(() => navigate('/login'))
    },
    login({ username, password }) {
      try {
        AuthService.login({ username, password })
          .then(() => {
            checkIfCookieExists(["CLIENT", "ADMIN"])
            navigate('/')
          })
      } catch(e) {
        console.log("ERROR : ", e)
      }
    },
    logout() {
      AuthService.logout()
        .then(() => {
          setCurrentUser({})
          localStorage.removeItem('isAuthenticated')
          localStorage.removeItem('isAdmin')
        })
    }
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return useContext(authContext);
}