import { InternalAxiosRequestConfig } from "axios"

export const successRequestInterceptor = (request: InternalAxiosRequestConfig) => {
  const token = sessionStorage.getItem('access_token')
  if (token) request.headers.Authorization = 'Bearer ' + token
  if (request.data instanceof FormData) {
    request.headers['Content-Type'] = 'multipart/form-data'
  } else {
    request.headers['Content-Type'] = 'application/json'
  }
  return request
}
