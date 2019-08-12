import request from '@/utils/request'

export function companyList(params) {
  return request({
    url: '/customer/company/list',
    method: 'get',
    params
  })
}
