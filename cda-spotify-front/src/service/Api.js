import axios from 'axios'

// const token = JSON.parse(localStorage.getItem('user'))
// console.log("TOKEN - " + token?.token)

export default () => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true
  })
}