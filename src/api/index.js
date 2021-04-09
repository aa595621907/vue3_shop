/*
    包含 n 个接口请求函数的模块
    每个函数返回 promise
*/

import ajax from './ajax'

// 登录
export const reqLogin = (username, password) =>
  ajax('/login', { username, password }, 'POST')

// 获取右侧导航菜单
export const getNavMenu = () => ajax('/menus')

// 获取用户信息
export const getUserInfo = (pagenum, pagesize) =>
  ajax('/users', { pagenum, pagesize })

// 修改用户状态
export const updateUserStatus = url => ajax(url, {}, 'PUT')

// 编辑用户提交
export const editUserInfo = (url, email, mobile) =>
  ajax(url, { email, mobile }, 'PUT')

// 删除用户
export const deleteUserInfo = url => ajax(url, {}, 'DELETE')

// 获取角色列表
export const getUserRoleList = url => ajax(url)

// 分配用户角色
export const setUserRoleApi = (url, rid) => ajax(url, { rid }, 'PUT')
