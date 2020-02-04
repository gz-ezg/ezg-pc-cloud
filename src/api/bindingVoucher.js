import request from '@/utils/request'

export function getVoucher(params) {
    return request({
      url: '/task/bindingVoucherTask',
      method: 'get',
      params
    })
  }
