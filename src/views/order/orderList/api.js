import { AjaxGet, AjaxDic, AjaxPost } from '../../../api/index'

function getRealName(config, success, fail){
  let url = 'product/server/list'
  return new Promise((resolve, reject)=>{
    resolve(AjaxGet(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

function orderFinishUpdate(config, success, fail){
  let url = 'order/finishedUpdate'
  return new Promise((resolve, reject)=>{
    resolve(AjaxPost(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

function orderUpdate(config, success, fail){
  let url = 'order/update'
  return new Promise((resolve, reject)=>{
    resolve(AjaxPost(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

function orderDetail(id, config, success, fail){
  let url = 'order/detail/' + id
  return new Promise((resolve, reject)=>{
    resolve(AjaxGet(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

function customerAccountDetail(config, success, fail){
  let url = `customer/account/detail`
  return new Promise((resolve, reject)=>{
    resolve(AjaxGet(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

function orderItemRefund(config, success, fail){
  let url = `order/item/refund`
  return new Promise((resolve, reject)=>{
    resolve(AjaxPost(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}
function orderRefundToCustomer(config, success, fail){
  let url = `order/item/refundToCustomer`
  return new Promise((resolve, reject)=>{
    resolve(AjaxPost(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

/**
 * 上传合同图片
 * @param {*} config 
 * @param {*} success 
 * @param {*} fail 
 */
function orderContractUpload(config, success, fail){
  let url = `order/contract/upload`
  return new Promise((resolve, reject)=>{
    resolve(AjaxPost(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

function orderCreate(config, success, fail){
  let url = `order/create`
  return new Promise((resolve, reject)=>{
    resolve(AjaxPost(url, config, success, fail))
  }).catch((err)=>{
    return err
  })
}

export {
  orderFinishUpdate,
  orderUpdate,
  orderDetail,
  customerAccountDetail,
  orderItemRefund,
  orderContractUpload,
  orderCreate,
  getRealName,
  orderRefundToCustomer
}