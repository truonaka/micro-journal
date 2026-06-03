import axios from 'axios'
import { normalizeApiError } from './appError'

const configuredApiUrl = process.env.REACT_APP_API_URL

export const DEFAULT_API_PORT = '8801'

export function resolveDefaultApiUrl(hostnameOverride) {
  const hasHostnameOverride = typeof hostnameOverride === 'string'

  if (!hasHostnameOverride && typeof window === 'undefined') {
    return `http://127.0.0.1:${DEFAULT_API_PORT}`
  }

  const hostname = hasHostnameOverride ? hostnameOverride : window.location.hostname || 'localhost'
  const resolvedHostname = hostname === 'localhost' ? '127.0.0.1' : hostname
  return `http://${resolvedHostname}:${DEFAULT_API_PORT}`
}

const apiClient = axios.create({
  baseURL: configuredApiUrl || resolveDefaultApiUrl()
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeApiError(error))
)

export default apiClient
