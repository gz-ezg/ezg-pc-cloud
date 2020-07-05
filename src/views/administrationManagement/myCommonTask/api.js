import request from '@/utils/request'

export function companyList(params) {
  return request({
    url: '/customer/company/list',
    method: 'get',
    params
  })
}

export function supplierCreate(data) {
  return request({
    url: '/product/supplier/create',
    method: 'post',
    data
  })
}
export function supplierUpdate(data) {
  return request({
    url: '/product/supplier/update',
    method: 'post',
    data
  })
}
