import request from '@/utils/request'

export function getCycleMonthInfoBycompanyId(params) {
  return request({
    url: '/order/cycle/company/getCycleMonthInfoBycompanyId',
    method: 'get',
    params
  })
}
export function oweOrderList(params) {
  return request({
    url: '/order/oweOrder/list',
    method: 'get',
    params
  })
}
export function auditList(params) {
  return request({
    url: '/order/oweOrder/auditList',
    method: 'get',
    params
  })
}
export function servicePeriod(params) {
  return request({
    url: '/order/cycle/service/record/budget/period',
    method: 'get',
    params
  })
}
export function createOweOrder(data) {
  return request({
    url: '/order/oweOrder/create',
    method: 'post',
    data
  })
}
export function updateOweOrder(data) {
  return request({
    url: '/order/oweOrder/update',
    method: 'post',
    data
  })
}
export function deleteOweOrder(params) {
  return request({
    url: '/order/oweOrder/delete',
    method: 'get',
    params
  })
}
export function oweOrderListByCompanyId(params) {
  return request({
    url: '/order/oweOrder/oweOrderListByCompanyId',
    method: 'get',
    params
  })
}
export function auditListByApplyId(params) {
  return request({
    url: '/order/oweOrder/auditListByApplyId',
    method: 'get',
    params
  })
}
export function audit(params) {
  return request({
    url: '/order/oweOrder/audit',
    method: 'get',
    params
  })
}

export function oweOrderListByFollowby(params) {
  return request({
    url: '/order/oweOrder/oweOrderListByFollowby',
    method: 'get',
    params
  })
}

export function orderDetail(params) {
  return request({
    url: `/order/detail/${params}`,
    method: 'get'
  })
}

export function accountDetail(params) {
  return request({
    url: `customer/account/detail`,
    method: 'get',
    params
  })
}
export function orderCreate(data) {
  return request({
    url: `order/create`,
    method: 'post',
    data
  })
}
export function getSystemParamByKey(params) {
  return request({
    url: `system/getSystemParamByKey`,
    method: 'get',
    params
  })
}
export function budgetPeriod(params) {
  return request({
    url: `order/cycle/service/record/budget/period`,
    method: 'get',
    params
  })
}
