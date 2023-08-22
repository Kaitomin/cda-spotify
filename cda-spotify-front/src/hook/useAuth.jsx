import { useState, createContext, useContext } from "react";
import AuthService from "../service/AuthService"
import jwtDecode from "jwt-decode";

const authContext = createContext()

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({})

  const checkIfCookieExists = (roles) => {
    AuthService.checkCookie()
    .then(res => {
      const token = jwtDecode(res.data)
      setCurrentUser({
        id: token.id,
        role: token.role
      })

      localStorage.setItem('isAuthenticated', true)
      localStorage.setItem('isAdmin', token.role === 'ADMIN')

      if (!roles.includes(token.role)) throw new Error("Unauthorized")
    }).catch((e) => {
      // console.log(e)
      window.location.href = '/'
    })
  } 
 
  return {
    currentUser,
    checkCookie(roles) {
      checkIfCookieExists(roles)
    },
    register({ username, password }) {
      AuthService.register({ username, password })
        .then(() => window.location.href = '/login')
    },
    login({ username, password }) {
      try {
        AuthService.login({ username, password })
          .then(() => {
            checkIfCookieExists(["CLIENT", "ADMIN"])
            window.location.href = '/'
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