import {AjaxGet, AjaxDic, AjaxPost} from '../../../../../api/index'

function postCustomerCompayShift(config, success, fail){
    let url = `customer/company/shift`
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function getCustomerList(config, success, fail){
    let url = `customer/list`
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
        // console.log(err)
    })
}

export {
    postCustomerCompayShift,
    getCustomerList
}