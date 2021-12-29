import request from '@/utils/request'
export function uvList(params) {
  return request({
    url:'/uv/list',
    method:'get',
    params:params
  })
}


export function uvTypeList(params) {
  return request({
    url:'/uv/type',
    method:'get',
    params:params
  })
}

