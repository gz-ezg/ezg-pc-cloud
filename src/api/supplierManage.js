import request from '@/utils/request'

export function getSupplier(params) {
  return request({
    url: '/product/supplier/list',
    method: 'get',
    params
  })
}

// 结算
export function settlementByWorkorderId(params) {
  return request({
    url: '/order/work/order/settlementByWorkorderId',
    method: 'get',
    params
  })
}
// 退回至未结算
export function cancelSettlementByWorkorderId(params) {
  return request({
    url: '/order/work/order/cancelSettlementByWorkorderId',
    method: 'get',
    params
  })
}
// 调整结算价
export function updateSettlementPrice(params) {
  return request({
    url: '/order/work/order/updateSettlementPrice',
    method: 'get',
    params
  })
}
// 产品ID获取供应商
export function listByProductId(params) {
  return request({
    url: '/product/supplier/listByProductId',
    method: 'get',
    params
  })
}

export function addSuppilerByWorkorderId(data) {
  return request({
    url: '/order/work/order/addSuppilerByWorkorderId',
    method: 'post',

    data
  })
}
// 开始服务--（供应商产品）行政部工单
export function beginExecutiveWorkOrder(data) {
  return request({
    url: '/order/work/order/beginExecutiveWorkOrder',
    method: 'post',
    data
  })
}
// 一键完结--行政部工单
export function doneExecutiveWorkOrder(data) {
  return request({
    url: '/order/work/order/doneExecutiveWorkOrder',
    method: 'post',
    data
  })
}
// 终止--行政部工单
export function terminateExecutiveWorkOrder(data) {
  return request({
    url: '/order/work/order/terminateExecutiveWorkOrder',
    method: 'post',
    data
  })
}
// 变更--行政部工单
export function changeWorkorderSuppiler(data) {
  return request({
    url: '/order/work/order/changeWorkorderSuppiler',
    method: 'post',
    data
  })
}
// 流转--行政部工单
export function goNextExecutiveWorkOrder(data) {
  return request({
    url: '/order/work/order/goNextExecutiveWorkOrder',
    method: 'post',
    data
  })
}