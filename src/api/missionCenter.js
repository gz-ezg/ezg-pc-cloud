import request from '@U/request'


export function sendMiniProgramMsgByWXOA(data) {
  return request({
    url: '/customer/sendMiniProgramMsgByWXOA',
    method: 'post',
    data
  })
}
export function getMonthServiceInfo(data) {
  return request({
    url: '/order/cycle/month/service/info',
    method: 'get',
    params: data
  })
}
export function addMonthServiceInfo(data) {
  return request({
    url: '/order/cycle/month/service/info/add',
    method: 'post',
    data
  })
}
export function updateMonthServiceInfo(data) {
  return request({
    url: '/order/cycle/month/service/info/update',
    method: 'post',
    data
  })
}
export function deleteMonthServiceInfo(data) {
  return request({
    url: '/order/cycle/month/service/info/delete',
    method: 'post',
    data
  })
}

export function getAccounterList(data) {
  return request({
    url: '/order/cycle/month/accounterList',
    method: 'get',
    params:data
  })
}