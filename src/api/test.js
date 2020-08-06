import Axios, { AxiosConfig } from './https'

export function test(data) {
  return Axios(
    new AxiosConfig({
      url: '/upload',
      method: 'POST',
      data
    })
  )
}
