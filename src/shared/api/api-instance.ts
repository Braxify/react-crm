import axios, { type AxiosInstance } from 'axios'

export const getApiInstance = (): AxiosInstance => {
  const api = axios.create({ baseURL: import.meta.env.BASE_URL })

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      console.error('API Error:', error)
      return Promise.reject(error)
    },
  )

  return api
}
