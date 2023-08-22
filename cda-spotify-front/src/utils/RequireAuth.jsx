import { useEffect } from 'react';
import useAuth from '../hook/useAuth'

const RequireAuth = ({ children }) => {
  const { checkCookie, currentUser } = useAuth()

  // Check cookie validity
  useEffect(() => {
    checkCookie(["CLIENT", "ADMIN"])
  }, [])

  return currentUser.id && children

}

export default RequireAuth