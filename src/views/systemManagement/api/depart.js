import {AjaxGet, AjaxDic, AjaxPost} from '../../../api/index'

function getDepartTree(config, success, fail){
    let url = 'system/depart/tree/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

// function getDictionary(params){
//     return new Promise((resolve, reject)=>{
//         resolve(AjaxDic(params))
//     }).catch((err)=>{
//         return err
//     })
// }

export {
    getDepartTree
}