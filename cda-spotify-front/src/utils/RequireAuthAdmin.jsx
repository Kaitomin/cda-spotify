import useAuth from '../hook/useAuth'
import { Navigate } from "react-router-dom";

const RequireAuthAdmin = ({ children }) => {
  const { currentUser } = useAuth()

  return currentUser.id && currentUser.role == "ADMIN" ? 
    children : currentUser.id && currentUser.role == "CLIENT" ?
    <Navigate to="/" replace /> :  <Navigate to="/login" replace />
}

export default RequireAuthAdmin