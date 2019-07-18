import request from '@U/request'

export function createNotify(data) {
  return request({
    url: '/system/notify/template/create',
    method: 'post',
    data
  })
}

export function updateNotify(data) {
  return request({
    url: '/system/notify/template/update',
    method: 'post',
    data
  })
}

export function listNotify(query) {
  return request({
    url: '/system/notify/template/list',
    method: 'get',
    params: query
  })
}

export function sendNotify(data) {
  return request({
    url: '/system/notify/template/send',
    method: 'post',
    data
  })
}

export function listDepartTree() {
  return request({
    url: '/system/depart/tree/list',
    method: 'get'
  })
}
export function updateLogStatus(data) {
  return request({
    url: '/system/log/wechat/company/log/status/update',
    method: 'post',
    data
  })
}

export function queryWechatCompanyLog(params) {
  return request({
    url: '/system/log/queryWechatCompanyLog/list',
    method: 'get',
    params
  })
}
export function getNewLogDetail() {
  return request({
    url: '/system/log/wechat/company/log/new/detail',
    method: 'get'
  })
}
export function logDetail(query) {
  return request({
    url: '/system/log/wechat/company/log/detail',
    method: 'get',
    params: query
  })
}
export function getUnreadNum() {
  return request({
    url: '/system/log/wechat/company/log/unread/num',
    method: 'get'
  })
}
export function listPersonLog(query) {
  return request({
    url: '/system/log/wechat/company/log/person/list',
    method: 'get',
    params: query
  })
}

export function markingUpdate(data) {
  return request({
    url: '/system/marketing/template/update',
    method: 'post',
    data
  })
}

export function marketingCreate(data) {
  return request({
    url: '/system/marketing/template/create',
    method: 'post',
    data
  })
}
export function marketingDetail(query) {
  return request({
    url: '/system/marketing/template/detail',
    method: 'get',
    params: query
  })
}
export function marketingDel(data) {
  return request({
    url: '/system/marketing/template/del',
    method: 'post',
    data
  })
}
export function marketingList(query) {
  return request({
    url: '/system/marketing/template/list',
    method: 'get',
    params: query
  })
}

export function queryWechatTemplatelogList(query) {
  return request({
    url: '/system/log/queryWechatTemplatelog/list',
    method: 'get',
    params: query
  })
}
export function sendMessage(data) {
  return request({
    url: '/system/message/sendMessage',
    method: 'post',
    data
  })
}

export function sendMessageByExcel(data) {
  return request({
    url: '/system/message/sendMessageByExcel',
    method: 'post',
    data
  })
}
