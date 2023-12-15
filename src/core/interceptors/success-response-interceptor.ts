import { AxiosResponse } from 'axios'

export const successResponseInterceptor = (response: AxiosResponse) => {
  return Promise.resolve(response)
}
