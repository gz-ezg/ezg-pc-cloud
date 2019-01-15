import {AjaxGet} from '../../../../api/index'

function getCustomerList(config, success, fail){
    let url = 'customer/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        reject(err)
    })
}

export { getCustomerList }