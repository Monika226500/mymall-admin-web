import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/admin/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/admin/info',//拉去用户信息
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
export function faceLogin(params) {
  return request({
    url:'/admin/flogin',
    method:'post',
    data:params //传大数据 必须用data 不用params
  })
}
