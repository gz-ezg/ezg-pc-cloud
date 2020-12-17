import request from '@U/request'

export function replySystemFeedback(data) {
  return request({
    url: '/system/replySystemFeedback',
    method: 'post',
    data
  })
}
// 商事员工工作日查询接口
export function queryBusinessPerformanceWorkday(data) {
  return request({
    url: '/user/performance/queryBusinessPerformanceWorkday',
    method: 'get',
    params: data
  })
}
// 商事员工绩效分查询接口
export function queryBusinessPerformanceScore(data) {
  return request({
    url: '/user/performance/queryBusinessPerformanceScore',
    method: 'get',
    params: data
  })
}
