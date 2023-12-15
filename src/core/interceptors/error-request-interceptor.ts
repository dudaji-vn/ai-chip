import { AxiosError } from 'axios'

export const errorRequestInterceptor = (error: AxiosError) => {
  return Promise.reject(error)
}
