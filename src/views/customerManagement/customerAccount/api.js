import {AjaxGet, AjaxDic} from '../../../api/index'

function getCustomerAccountList(config, success, fail){
    let url = 'customer/account/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getDictionary(params){
    return new Promise((resolve, reject)=>{
        resolve(AjaxDic(params))
    }).catch((err)=>{
        return err
    })
}

function getAccountRecordList(config, success, fail){
    let url = `customer/account/record/list`
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getAccountRecordItem(config, success, fail){
    let url = `customer/account/record/items`
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getCustomerIntegralList(config, success, fail){
    let url = `customer/integral/list`
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

export { getCustomerAccountList, getDictionary, getAccountRecordList, getAccountRecordItem, getCustomerIntegralList }