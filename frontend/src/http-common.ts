import type { AxiosInstance } from 'axios'
import axios from 'axios'
const host = 'http://localhost:3000'

const apiClient: AxiosInstance = axios.create({
  baseURL: host,
  headers: {
    'Content-type': 'application/json',
  },
})

export default apiClient
