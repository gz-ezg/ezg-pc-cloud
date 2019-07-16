import request from '@/utils/request'

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

export const queryCodes = async query => {
  try {
    let resp = await request({
      url: '/system/tsType/queryTsTypeByGroupCodes',
      method: 'get',
      params: { groupCodes: query }
    })
    let TEM = resp[query].map(v => {
      return {
        value: v.typecode,
        label: v.typename
      }
    })
    let MAP = {}
    resp[query].forEach(v => {
      MAP[v.typecode] = v.typename
    })
    return [TEM, MAP]
  } catch (error) {
    console.log(error)
  }
}
