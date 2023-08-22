import { useEffect } from 'react';
import useAuth from '../hook/useAuth'

const RequireAuthAdmin = ({ children }) => {
  const { currentUser, checkCookie } = useAuth()

  // Check cookie validity
  useEffect(() => {
    checkCookie("ADMIN")
  }, [])

  return currentUser.id && currentUser.role === 'ADMIN' && children
}

export default RequireAuthAdmin