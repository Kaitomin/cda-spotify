import { useEffect } from 'react';

import useAuth from '../hook/useAuth'

const RequireAuth = ({ children }) => {

  // Check cookie validity
  useEffect(() => {
    checkCookie(["CLIENT", "ADMIN"])
  }, [])
  
  const { checkCookie, currentUser } = useAuth()

  return currentUser.id && children
}

export default RequireAuth