import request from '@/utils/request'

export function getSupplier(params) {
    return request({
      url: '/product/supplier/list',
      method: 'get',
      params
    })
  }

  // export function addSupplier(params) {
  //   return request({
  //     url: '/product/supplier/create',
  //     method: 'post',
  //     params
  //   })
  // }

