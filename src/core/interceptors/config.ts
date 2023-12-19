import axios from 'axios'
import { successRequestInterceptor } from '@/core/interceptors/success-request-interceptor'
import { errorRequestInterceptor } from '@/core/interceptors/error-request-interceptor'
import { successResponseInterceptor } from '@/core/interceptors/success-response-interceptor'
import { errorResponseInterceptor } from '@/core/interceptors/error-response-interceptor'

const config = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + '/api/v1/',
  timeout: 10000,
}

export const instance = axios.create(config)

instance.interceptors.request.use(
  successRequestInterceptor,
  errorRequestInterceptor
)

instance.interceptors.response.use(
  successResponseInterceptor,
  errorResponseInterceptor
)
