import {AjaxGet, AjaxDic, AjaxPost} from '../.././../api/index'

function postModifyProductSkuFlowDiagram(config, success, fail){
    let url = 'product/modifyProductSkuFlowDiagram'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

export {
    postModifyProductSkuFlowDiagram,
}