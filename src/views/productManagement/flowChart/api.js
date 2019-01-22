import {AjaxGet, AjaxDic, AjaxPost} from '../.././../api/index'

function getProductSkuFlowDiagramList(config, success, fail){
    let url = 'product/productSkuFlowDiagramList'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function postProductCreateSkuFlowDiagram(config, success, fail){
    let url = 'product/createSkuFlowDiagram'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

export {
    getProductSkuFlowDiagramList,
    postProductCreateSkuFlowDiagram
}