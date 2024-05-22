import axios from 'axios'

const api = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  headers: {
    accept: 'application/json'
  },
  timeout: 12000
})

export default api
