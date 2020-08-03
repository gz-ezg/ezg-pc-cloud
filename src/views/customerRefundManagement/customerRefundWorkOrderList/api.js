import {
    AjaxGet,
    AjaxDic,
    AjaxPost
} from '../../../api/index'

function getDictionary(params){
    return new Promise((resolve, reject)=>{
        resolve(AjaxDic(params))
    }).catch((err)=>{
        return err
    })
}

function getWordOrderList(config, success, fail){
    let url = "order/workOrderList"
    return new Promise((resolve, reject) => {
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err) => {
        return err
    })
}

export {
    getDictionary,
    getWordOrderList
}