/*
    包含 n 个接口请求函数的模块
    每个函数返回 promise
*/

import ajax from './ajax'

// 登录
export const reqLogin = (username, password) =>
  ajax(
    'http://127.0.0.1:8888/api/private/v1/login',
    { username, password },
    'POST'
  )
