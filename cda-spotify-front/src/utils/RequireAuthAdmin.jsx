import { useEffect } from 'react';
import useAuth from '../hook/useAuth'

const RequireAuthAdmin = ({ children }) => {

  // Check cookie validity
  useEffect(() => {
    checkCookie("ADMIN")
  }, [])
  
  const { currentUser, checkCookie } = useAuth()

  return currentUser.id && currentUser.role === 'ADMIN' && children
}

export default RequireAuthAdmin