
import Api from './Api'

export default {
  register(newUser) {
    return Api().post('/api/auth/register', newUser)
  },
  login(newUser) {
    return Api().post('/api/auth/authenticate', newUser)
  }
}