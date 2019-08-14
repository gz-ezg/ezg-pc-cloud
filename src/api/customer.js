import request from '@/utils/request'

export function companyList(params) {
  return request({
    url: '/customer/company/list',
    method: 'get',
    params
  })
}
export function customerDetail(params) {
  return request({
    url: '/customer/detail',
    method: 'get',
    params
  })
}
export function getAccount(params) {
  return request({
    url: '/customer/account/detail',
    method: 'get',
    params
  })
}
export function createCustomerEnd(data) {
  return request({
    url: '/customer/createCustomerEnd',
    method: 'post',
    data
  })
}
