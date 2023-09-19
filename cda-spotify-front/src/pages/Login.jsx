import { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import Cookies from "js-cookie"

import { sanitizeInput } from "../utils/CustomFunctions"
import useAuth from "../hook/useAuth"
import ModalMessage from "../components/ModalMessage"

const Login = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const { login, authError, loginLoading } = useAuth()
  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    cookie: ""
  })
  const recaptchaRef = useRef()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value,
    })

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: sanitizeInput(value, name),
    }))
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!Cookies.get('Streamy Cookie Consent')) {
      setErrors({...errors, cookie: 'Veuillez accepter les cookies'})
      setShowModal(true)
      setTimeout(() => {
        setShowModal(false)
        setErrors({...errors, cookie: ''})
      }, 1500)
      return
    }

    if (!recaptchaRef.current.getValue()) return

    let hasError = false

    for (const key in user) {
      const msgError = sanitizeInput(user[key], key)

      setErrors(prevErrors => ({
        ...prevErrors,
        [key]: msgError,
      }))

      if (msgError) hasError = true
    }

    // Cancel form submission
    if (hasError) return

    login({ username: user.username, password: user.password }, recaptchaRef.current.getValue())
  }

  useEffect(() => {
    if (localStorage.getItem("isAuthenticated")) {
      navigate("/")
    }
  }, [])

  useEffect(() => {
    if (!authError) return

    setShowModal(true)
    setTimeout(() => setShowModal(false), 1500)
  }, [authError])

  return (
    !(localStorage.getItem("isAuthenticated")) &&
    <div className="login flex-grow-1 mt-5 position-relative">
      <form onSubmit={handleLogin} className="d-flex flex-column m-auto">
        <h1>Connexion</h1>
        <div className="d-flex flex-column row-gap-3 px-3 pt-3 pb-4">
          <div>
            <label htmlFor="username">Nom d&#39;utilisateur</label>
            <input
              type="text"
              name="username"
              id="username"
              className={`w-100 form__field ${
                errors.username ? "is-invalid" : user.username ? "is-valid" : ""
              } input`}
              onChange={handleChange}
            />
            {errors.username && (
              <span className="invalid-feedback">{errors.username}</span>
            )}
          </div>
          <div>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              name="password"
              id="password"
              className={`w-100 form__field ${
                errors.password ? "is-invalid" : user.password ? "is-valid" : ""
              } input`}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="invalid-feedback">{errors.password}</span>
            )}
          </div>
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
            className="g-recaptcha"
          />
          <button className="mt-3" disabled={loginLoading}>Se connecter</button>
        </div>
      </form>
      <div className="d-flex justify-content-center mt-4">
        <Link to='/register'>Pas encore de compte ?</Link>
      </div>
      {errors.cookie && showModal && <ModalMessage message={errors.cookie} />}
      {authError && showModal && <ModalMessage message={authError} />}
      {!authError && loginLoading && <ModalMessage loader={true} />}
    </div>
  )
}
export default Login
