import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'

const Register = () => {
  const navigate = useNavigate()
  const { register, currentUser } = useAuth()
  const [user , setUser] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  })
  

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
        ...user,
        [name]: value
      }
    )
  }

  const handleRegister = e => {
    e.preventDefault()

    register({ username: user.username, password: user.password })
  }

  useEffect(() => {
    if (localStorage.getItem('isAuthenticated')) {
      navigate('/')
    }
  }, [])

  return (
    <div className='register'>
      <h1>Créer un compte</h1>
      <form onSubmit={handleRegister} className="d-flex flex-column w-50 m-auto">
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" id="username" className="w-100" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" className="w-100" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm password</label>
          <input type="password" name="confirmPassword" id="confirmPassword" className="w-100" onChange={handleChange} />
        </div>
        <button>S'inscrire</button>
      </form>
    </div>
  )
}

export default Register