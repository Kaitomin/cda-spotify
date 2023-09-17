import { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import Cookies from 'js-cookie'

import ModalMessage from "../components/ModalMessage"
import { sanitizeInput } from "../utils/CustomFunctions"
import useAuth from "../hook/useAuth"

const Register = () => {
  const navigate = useNavigate()
  const { register, authError } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  })
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: ""
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

  const handleRegister = (e) => {
    e.preventDefault()

    // Check errors
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

    if (user.password !== user.confirmPassword) return

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

    register({ username: user.username, password: user.password }, recaptchaRef.current.getValue())
    recaptchaRef.current.reset()
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
    !localStorage.getItem("isAuthenticated") && (
      <div className="register flex-grow-1 mt-5">
        <form
          onSubmit={handleRegister}
          className="d-flex flex-column m-auto"
        >
          <h1>Inscription</h1>
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
            <div>
              <label htmlFor="confirmPassword">Confirmation mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className={`w-100 form__field ${
                  user.password !== user.confirmPassword || errors.confirmPassword
                    ? "is-invalid"
                    : user.password
                    ? "is-valid"
                    : ""
                } input`}
                onChange={handleChange}
              />
              <span className="invalid-feedback">
                {errors.confirmPassword
                  ? errors.confirmPassword
                  : "Mot de passe de confirmation ne correspond pas"}
              </span>
            </div>
            <ReCAPTCHA 
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_KEY}
              className="g-recaptcha"
            />
            <button className="mt-3">Créer un compte</button>
          </div>
        </form>
        {errors.cookie && showModal && <ModalMessage message={errors.cookie} />}
        {authError && showModal && <ModalMessage message={authError} />}
      </div>
    )
  )
}

export default Register
