import { AxiosError } from "axios"

export const unauthorizedInterceptor = (error: AxiosError) => {
  return Promise.reject(error)
}
