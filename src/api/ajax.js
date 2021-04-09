// 请求函数模块
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 公共请求路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'

// 请求拦截器
axios.interceptors.request.use(config => {
  if (config.url !== '/login') {
    // 本地token
    const token = JSON.parse(window.localStorage.getItem('USER_KEY'))
    // 每个请求都添加请求头
    config.headers.common.Authorization = token
  }
  return config
})

export default function(url, data = {}, methods = 'GET') {
  return new Promise(resolve => {
    let promise
    if (methods === 'GET') {
      promise = axios.get(url, { params: data })
    } else if (methods === 'PUT') {
      promise = axios.put(url, data)
    } else if (methods === 'DELETE') {
      promise = axios.delete(url, data)
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then(response => {
        resolve(response.data)
      })
      .catch(() => {
        ElMessage.error('服务器没有响应,请稍后再试')
      })
  })
}
