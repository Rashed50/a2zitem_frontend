import axios from 'axios'

function resolveBaseUrl() {
  const url =
  // 'https://a2zbackend.a2zitem.com/api'
    // import.meta.env.VITE_API_BASE_URL?.trim() ||
    import.meta.env.VITE_API_BASE_URL_PRODUCTION?.trim() ||
    ''
  return url.replace(/\/$/, '')
}

const apiClient = axios.create({
  baseURL: resolveBaseUrl(),
  timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    if (import.meta.env.DEV) {
      const base = config.baseURL || ''
      const path = config.url?.startsWith('http') ? config.url : `${base}${config.url || ''}`
      console.debug('[API]', config.method?.toUpperCase(), path)
    }
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      error.message ||
      'Request failed'
    const status = error.response?.status
    if (import.meta.env.DEV) {
      console.warn('[API]', status || 'network', message)
    }
    return Promise.reject({ message, status, original: error })
  }
)

export default apiClient
