import useAuth from '../hook/useAuth'
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { currentUser } = useAuth()

  console.log(currentUser)
  return currentUser.id ? children : <Navigate to="/login" replace />
}

export default RequireAuth