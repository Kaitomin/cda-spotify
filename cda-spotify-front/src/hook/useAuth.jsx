import { useState, createContext, useContext } from "react";
import AuthService from "../service/AuthService"

const authContext = createContext()

const useAuth = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { id: null, role: null })

  return {
    // isAuthenticated,
    currentUser,
    register({ username, password }) {
      try {
        AuthService.register({ username, password })
          .then(res => {
            const user = {
              id: res.data.id,
              role: res.data.role,
              token: res.data.token
            }
            // setIsAuthenticated(true)
            localStorage.setItem('user', JSON.stringify(user))
            setCurrentUser(user)
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
              role: res.data.role,
              token: res.data.token
            }
            // setIsAuthenticated(true)
            localStorage.setItem('user', JSON.stringify(user))
            setCurrentUser(user)
          })
      } catch(e) {
        console.log("ERROR : ", e)
      }
    },
    logout() {
      localStorage.removeItem('user')
      setCurrentUser({ id: null, role: null })
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