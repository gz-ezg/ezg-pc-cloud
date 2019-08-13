import request from '@U/request'
export function listUser(data) {
  return request({
    url: '/user/list',
    method: 'get',
    params: data
  })
}