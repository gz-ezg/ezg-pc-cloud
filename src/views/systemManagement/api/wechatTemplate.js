import {AjaxGet, AjaxDic, AjaxPost} from '../../../api/index'

function getMsgTemplateList(config, success, fail){
    let url = 'system/queryMsgtemplate/list'
    return new Promise((resolve, reject)=>{
        resolve(AjaxGet(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function postSaveMsgTemplate(config, success, fail){
    let url = 'system/saveMsgtemplate'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
    }).catch((err)=>{
        return err
    })
}

function postUpdateMsgTemplate(config, success, fail){
    let url = 'system/updateMsgtemplate'
    return new Promise((resolve, reject)=>{
        resolve(AjaxPost(url, config, success, fail))
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

export {
    getMsgTemplateList,
    postSaveMsgTemplate,
    postUpdateMsgTemplate,
    getDictionary
}