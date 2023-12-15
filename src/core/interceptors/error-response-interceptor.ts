import { unauthorizedInterceptor } from '@/core/interceptors/response-interceptors'
import axios, { AxiosError, AxiosResponse, HttpStatusCode } from 'axios'


export const errorResponseInterceptor = (error: AxiosError) : Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { statusText, status } = error.response as AxiosResponse ?? {};
    switch (status) {
      case HttpStatusCode.Unauthorized: {
        unauthorizedInterceptor(error)
        break;
      }
      default: {
        Promise.reject(error)
        break; 
      }
    }
  }
  return Promise.reject(error);
}
