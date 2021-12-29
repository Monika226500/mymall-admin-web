
import request from '@/utils/request'

export function reg(params) {
  console.log(params)
  return request({
    url:'/admin/reg',
    method:'post',
    data:params //传大数据 必须用data 不用params
  })
}
