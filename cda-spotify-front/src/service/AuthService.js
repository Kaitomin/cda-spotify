
import Api from './Api'

export default {
  register(newUser) {
    return Api().post('/api/auth/register', newUser)
  },
  login(newUser) {
    return Api().post('/api/auth/authenticate', newUser)
  },
  logout() {
    return Api().get('http://localhost:8080/api/auth/logout')
  },
  checkCookie() {
    return Api().get('http://localhost:8080/api/auth/checkCookie')
  }
}