import request from '@U/request'

export function replySystemFeedback(data) {
  return request({
    url: '/system/replySystemFeedback',
    method: 'post',
    data
  })
}
