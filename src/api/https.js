import axios from 'axios'
// import base64 from 'base-64'

// import router from '@/router'
import { Toast } from '@/utils'
// import{ codeMessage } from'@/utils/code-message'

const isDev = process.env.NODE_ENV === 'development'
// 从暴露的全局配置中获取当前环境对应的配置对象
const globalConfig = NT_CONFIG[isDev ? 'DEV' : 'PROD']

const DEFAULT_OPTIONS = {
  timeout: 30000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
}

const Axios = axios.create(DEFAULT_OPTIONS)

/**
 * 请求时的拦截
 */
Axios.interceptors.request.use(
  config => {
    /*const token = Auth.getToken()
    // token 存在且请求头中没有 Authorization 字段时添加
    if(token && !config.headers.Authorization) {
      const random = parseInt(Math.random() * Math.pow(10, 6)).toString()
      config.headers.Authorization = base64.encode(`${random}:${token}`)
    }*/
    // 发送请求之前做一些处理
    Toast.loading({ message: '加载中...' })
    return config
  },
  error => {
    // 当请求异常时做一些处理
    Toast.clear()
    const errorInfo = error.data.error ? error.data.error.message : error.data
    return Promise.reject(errorInfo)
  }
)

/**
 * 响应时拦截
 */
Axios.interceptors.response.use(
  response => {
    // 返回响应时做一些统一处理
    Toast.clear()
    /*if(response.data.status === 10002) {
      Toast.fail({ message: response.data.desc })
      // netintech.msg(codeMessages['10002'] + ':' + response.data.desc)
    } else if(response.data.status === 10004) {
      Toast.fail({ message: response.data.desc })
      // netintech.msg(codeMessages['10004'])
      localStorage.removeItem('token')
      return router.push('/')
    } else {
      if(response.data.status !== 10001) {
        Toast.fail({ message: response.data.desc })
      }
      return response.data
    }*/
    return response.data
  },
  error => {
    if(error.response && error.response.status) {
      switch (error.response.status) {
        case 400:
          Toast.fail({ message: '错误请求' })
          break
        case 401:
          Toast.fail({ message: '未授权，请重新登录' })
          break
        case 403:
          Toast.fail({ message: '拒绝访问' })
          break
        case 404:
          Toast.fail({ message: '请求错误,未找到该资源' })
          break
        case 405:
          Toast.fail({ message: '请求方法未允许' })
          break
        case 408:
          Toast.fail({ message: '请求超时' })
          break
        case 500:
          Toast.fail({ message: '服务器端出错' })
          break
        case 501:
          Toast.fail({ message: '网络未实现' })
          break
        case 502:
          Toast.fail({ message: '网络错误' })
          break
        case 503:
          Toast.fail({ message: '服务不可用' })
          break
        case 504:
          Toast.fail({ message: '网络超时' })
          break
        case 505:
          Toast.fail({ message: 'http版本不支持该请求' })
          break
        default:
          Toast.fail({ message: '连接错误' + error.response.status })
      }
    } else {
      if(error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
        Toast.fail({ message: '请求超时，请稍后重试' })
      } else {
        Toast.fail({ message: '数据获取失败' })
      }
    }
  }
)

export default Axios
export class AxiosConfig {
  /**
   * @param {Object} options
   * @param {string} [options.baseURL] 协议+主机名，不传递将取当前环境（开发/生产）全局配置下的 BASE_URL_MAP.DEFAULT
   * @param {string} options.url 请求路径
   * @param {Object} [options.data = {}] 请求数据
   * @param {Object} [options.headers = {}] 请求头
   */
  constructor({ baseURL, url, method = 'GET', data = {}, headers = {} } = {}) {
    if(!url) {
      throw new RangeError('缺少 url 参数')
    }
    // 如果没有传入 baseURL 使用 GLOBAL_CONFIG 对应当前环境的 DEFAULT 配置
    this.baseURL = baseURL || globalConfig.BASE_URL_MAP.DEFAULT
    this.url = url
    this.method = method
    this.headers = headers
    if(this.method === 'GET') {
      this.params = data
    } else {
      this.data = data
    }
  }
}
