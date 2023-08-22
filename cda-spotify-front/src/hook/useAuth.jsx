import { useState, createContext, useContext } from "react";
import AuthService from "../service/AuthService"
import jwtDecode from "jwt-decode";

const authContext = createContext()

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState({})
 
  return {
    currentUser,
    checkCookie(roles) {
      AuthService.checkCookie()
        .then(res => {
          const token = jwtDecode(res.data)
          setCurrentUser({
            id: token.id,
            role: token.role
          })

          if (!roles.includes(token.role)) throw new Error("Unauthorized")
        }).catch((e) => {
          // console.log(e)
          window.location.href = '/'
        })
    },
    register({ username, password }) {
      try {
        AuthService.register({ username, password })
          .then(res => {
            const user = {
              id: res.data.id,
              role: res.data.role,
              token: res.data.token
            }
            setCurrentUser(user)
            localStorage.setItem('isAuthenticated', true)
            localStorage.setItem('isAdmin', token.role === 'ADMIN')
          })
      } catch(e) {
        console.log("ERROR : ", e)
      }
    },
    login({ username, password }) {
      try {
        AuthService.login({ username, password })
          .then(res => {
            const user = {
              id: res.data.id,
              role: res.data.role
            }
            setCurrentUser(user)
            localStorage.setItem('isAuthenticated', true)
            localStorage.setItem('isAdmin', res.data.role === 'ADMIN')
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