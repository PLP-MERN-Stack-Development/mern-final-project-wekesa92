import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const instance = axios.create({ baseURL: API_URL })

instance.setToken = (t) => {
  if (t) instance.defaults.headers.common['Authorization'] = `Bearer ${t}`
  else delete instance.defaults.headers.common['Authorization']
}

export default instance
