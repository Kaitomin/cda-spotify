import axios from "axios"

export default () => {
  return axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
    withCredentials: true, 
    headers: {
      'X-CSRF-TOKEN': localStorage.getItem('csrf-token')
    }
  })
}