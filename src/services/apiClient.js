import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_PRODUCTION || '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor – e.g. add auth token
apiClient.interceptors.request.use(
  (config) => {

      console.log('API Request URL:', config.baseURL + config.url)

    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor – return data, throw on error
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.log('API Respponse Error    :', error)
    const message = error.response?.data?.message || error.message || 'Request failed'
    const status = error.response?.status
    return Promise.reject({ message, status, original: error })
  }
)

export default apiClient
