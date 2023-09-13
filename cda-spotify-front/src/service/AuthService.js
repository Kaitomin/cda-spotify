
import Api from './Api'

export default {
  register(newUser, recaptchaToken) {
    console.log(recaptchaToken)
    return Api().post('/api/auth/register', newUser, {
      params: {
        "g-recaptcha-response": recaptchaToken
      }
    })
  },
  login(user, recaptchaToken) {
    return Api().post('/api/auth/authenticate', user, {
      params: {
        "g-recaptcha-response": recaptchaToken
      }
    })
  },
  logout() {
    return Api().get('/api/auth/logout')
  },
  checkCookie() {
    return Api().get('/api/auth/checkCookie')
  }
}