
import Api from './Api'

export default {
  register(newUser) {
    console.log(newUser);
    return Api().post('/api/auth/register', newUser)
  },
  login(newUser) {
    return Api().post('/api/auth/authenticate', newUser)
  },
  logout() {
    return Api().get('/api/auth/logout')
  },
  checkCookie() {
    return Api().get('/api/auth/checkCookie')
  }
}