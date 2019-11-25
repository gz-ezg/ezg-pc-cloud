import request from '@/utils/request'

export function getCompanyDetailByCompanyName(params) {
    return request({
      url: 'customer/company/getCompanyDetailByCompanyName',
      method: 'get',
      params
    })
  }
