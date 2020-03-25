import request from '@U/request'
// 获取一级菜单
export function getMenuTree(params) {
  return request({
    url: '/menu/getMenuTree',
    method: 'get',
    params
  })
}

export function deleteMenu(params) {
  return request({
    url: '/menu/deleteMenu',
    method: 'get',
    params
  })
}
export function createMenu(data) {
  return request({
    url: '/menu/createMenu',
    method: 'post',
    data
  })
}

export function createButton(data) {
  return request({
    url: '/menu/createButton',
    method: 'post',
    data
  })
}
export function getButtonList(params) {
  return request({
    url: '/menu/getButtonList',
    method: 'get',
    params
  })
}
export function addGather(params) {
  return request({
    url: '/system/addGather',
    method: 'get',
    params
  })
}
export function getLabelList(params) {
  return request({
    url: '/system/label/list',
    method: 'get',
    params
  })
}
