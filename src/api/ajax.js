// 请求函数模块
import axios from 'axios'
import { ElMessage } from 'element-plus'

export default function(url, data = {}, methods = 'get') {
  return new Promise(resolve => {
    let promise
    if (methods === 'GET') {
      promise = axios.get(url, { params: data })
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
