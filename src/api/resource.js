import request from '@U/request'

export function updateSource(data) {
  return request({
    url: '/system/resource/updateSource',
    method: 'post',
    data
  })
}
