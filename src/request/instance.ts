import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'

export class Instance {
  baseURL: string
  instance: AxiosInstance
  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.instance = axios.create({
      baseURL,
      timeout: 5000,
    })
    this.instance.interceptors.request.use((config: AxiosRequestConfig) => {
      if (config.method === 'GET') {
        config.paramsSerializer = params =>
          qs.stringify(params, {
            arrayFormat: 'repeat',
          })
        return config
      }
      return config
    })
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data
      },
      (error: AxiosError) => {
        return Promise.reject(error.response)
      }
    )
  }
}

const uBaseUrl = 'https://u.y.qq.com/'

export const uInstance = new Instance(uBaseUrl).instance
